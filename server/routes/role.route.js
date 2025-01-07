import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    getAdminRoles,
    getAllRoles,
    getRoleById,
    postRole,
    updateRole, // Import the new controller
} from "../controllers/role.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postRole);
router.route("/get").get(isAuthenticated, getAllRoles);
router.route("/getadminroles").get(isAuthenticated, getAdminRoles);
router.route("/get/:id").get(getRoleById);
router.route("/update/:id").put(isAuthenticated, updateRole); // New route for updating roles

export default router;
