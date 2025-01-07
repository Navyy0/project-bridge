import { Project } from "../models/project.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerProject = async (req, res) => {
    try {
        const { projectName } = req.body;
        if (!projectName) {
            return res.status(400).json({
                message: "Project name is required.",
                success: false
            });
        }
       /* let project = await Project.findOne({ name: projectName });
        if (project) {
            return res.status(400).json({
                message: "You can't register same project.",
                success: false
            })
        };*/
     let project = await Project.create({
            name: projectName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Project registered successfully.",
            project,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getProject = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const projects = await Project.find({ userId });
        if (!projects) {
            return res.status(404).json({
                message: "Projects not found.",
                success: false
            })
        }
        return res.status(200).json({
            projects,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get project by id
export const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
                success: false
            })
        }
        return res.status(200).json({
            project,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProject = async (req, res) => {
    try {
        const { name, description, website, college} = req.body;
 
        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, college, logo };

        const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Project information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
