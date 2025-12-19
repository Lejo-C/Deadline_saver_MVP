import { Router } from "express";
import { assignment, getAssignments, deleteAssignment, updateAssignment } from "../Controllers/assignment.js";

const router = Router();

router.post("/analyze", assignment);

router.get("/", getAssignments);

router.delete("/:id", deleteAssignment);

router.put("/:id", updateAssignment);

export default router;