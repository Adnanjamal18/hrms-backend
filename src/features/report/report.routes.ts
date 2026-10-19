import { Router } from "express";
import {
  getAttendanceReport,
  getLeaveReport,
  getPayrollReport,
  getProjectReport,
} from "./report.controller.js";

const router = Router();

router.get("/attendance", getAttendanceReport);
router.get("/leave", getLeaveReport);
router.get("/payroll", getPayrollReport);
router.get("/project", getProjectReport);

export default router;
