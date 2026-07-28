import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { applyLeaveSchema } from "../../validatiors/leave.validator.js";
import { 
  applyLeave, cancelLeave, approveLeave, rejectLeave, getLeaveHistory, getLeaveBalance, getAllPendingLeaves
} from "./leavecontroller.js";

const router = Router();

router.post("/apply", validateRequest(applyLeaveSchema), applyLeave);
router.patch("/:id/cancel", cancelLeave);
router.get("/history", getLeaveHistory);
router.get("/pending", getAllPendingLeaves);
router.get("/balance", getLeaveBalance);

router.patch("/:id/approve", approveLeave);
router.patch("/:id/reject", rejectLeave);

export default router;
