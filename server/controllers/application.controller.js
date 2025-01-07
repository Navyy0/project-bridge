import { Application } from "../models/application.model.js";
import { Role } from "../models/role.model.js";

export const applyRole = async (req, res) => {
    try {
        const userId = req.id;
        const roleId = req.params.id;
        if (!roleId) {
            return res.status(400).json({
                message: "Role id is required.",
                success: false
            })
        };
        // check if the user has already applied for the role
        const existingApplication = await Application.findOne({ role: roleId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this role",
                success: false
            });
        }

        // check if the jobs exists
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({
                message: "Role not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            role:roleId,
            applicant:userId,
        });

        role.applications.push(newApplication._id);
        await role.save();
        return res.status(201).json({
            message:"Role applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedRoles = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'role',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'project',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findById(roleId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!role){
            return res.status(404).json({
                message:'Role not found.',
                success:false
            })
        };
        return res.status(200).json({
            role, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}