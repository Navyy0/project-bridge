import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyRole, getApplicants, getAppliedRoles, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyRole);
router.route("/get").get(isAuthenticated, getAppliedRoles);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;
