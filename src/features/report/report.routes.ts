import { Router } from "express";
import { getAttendanceReport, getLeaveReport,  } from "./report.controller.js";

const router = Router();

router.get("/attendance", getAttendanceReport);
router.get("get-leave",getLeaveReport);

export default router;
