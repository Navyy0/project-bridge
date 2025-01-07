import { Role } from "../models/role.model.js";

// admin post krega role
export const postRole = async (req, res) => {
    try {
        const { title, description, requirements, college, roleType, experience, position, projectId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements  || !college|| !roleType || !experience || !position || !projectId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const role = await Role.create({
            title,
            description,
            requirements: requirements.split(","),
            
            college,
            roleType,
            experienceLevel: experience,
            position,
            project: projectId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New role created successfully.",
            role,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllRoles = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const roles = await Role.find(query).populate({
            path: "project",
        }).sort({ createdAt: -1 });
        if (!roles) {
            return res.status(404).json({
                message: "Roles not found.",
                success: false
            })
        };
        return res.status(200).json({
            roles,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getRoleById = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findById(roleId).populate({
            path:"applications"
        });
        if (!role) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ role, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne role create kra hai abhi tk
export const getAdminRoles = async (req, res) => {

    try {
        const adminId = req.id;
        const roles = await Role.find({ created_by: adminId }).populate({
            path:'project',
            createdAt:-1
        });
        if (!roles) {
            return res.status(404).json({
                message: "Roles not found.",
                success: false
            })
        };
        return res.status(200).json({
            roles,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateRole = async (req, res) => {
    try {
        const roleId = req.params.id; // Get the role ID from the URL
        const updates = req.body; // Fields to update

        // Validate required fields (if needed)
        if (!updates.title && !updates.description && !updates.projectId) {
            return res.status(400).json({
                message: "Nothing to update.",
                success: false,
            });
        }

        // Find and update the role
        const updatedRole = await Role.findByIdAndUpdate(roleId, updates, { new: true });

        if (!updatedRole) {
            return res.status(404).json({
                message: "Role not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Role updated successfully.",
            role: updatedRole,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while updating the role.",
            success: false,
        });
    }
};
