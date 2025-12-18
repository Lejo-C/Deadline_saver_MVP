import {Router} from "express";
import {assignment, getAssignments, deleteAssignment, updateAssignment} from "../Controllers/assignment.js";

const router = Router();

router.post("/analyze", (req, res) => {
  res.json({ message: "Analyze endpoint working" });
});

router.get("/", getAssignments);

router.delete("/:id", deleteAssignment);

router.put("/:id", updateAssignment);

export default router;