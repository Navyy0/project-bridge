import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getProject, getProjectById, registerProject, updateProject } from "../controllers/project.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerProject);
router.route("/get").get(isAuthenticated,getProject);
router.route("/get/:id").get(isAuthenticated,getProjectById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateProject);

export default router;
