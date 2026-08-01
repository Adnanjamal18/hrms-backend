import { Router } from "express";
import { getAttendanceReport,  } from "./report.controller.js";

const router = Router();

router.get("/attendance", getAttendanceReport);


export default router;
