import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { leaveTypeSchema } from "../../validatiors/leave-type.validator.js";
import { createLeaveType, getAllLeaveTypes, updateLeaveType, deleteLeaveType } from "./leave-type.controller.js";

const router = Router();

router.post("/", validateRequest(leaveTypeSchema), createLeaveType);
router.get("/", getAllLeaveTypes);
router.patch("/:id", validateRequest(leaveTypeSchema.partial()), updateLeaveType);
router.delete("/:id", deleteLeaveType);

export default router;
