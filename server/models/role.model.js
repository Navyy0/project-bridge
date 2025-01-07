import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    
    experienceLevel:{
        type:Number,
        required:true,
    },
    college: {
        type: String,
        required: true
    },
    roleType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
},{timestamps:true});
export const Role = mongoose.model("Role", roleSchema);