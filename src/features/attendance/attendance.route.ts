import { Router } from "express";
import { AttendanceRepository } from "./attendance.repository.js";
import { AttendanceService } from "./attendance.service.js";
import { AttendanceController } from "./attendance.controller.js";
import { prisma } from "../../config/db.js";

const router = Router();

const repository = new AttendanceRepository(prisma);
const service = new AttendanceService(repository);
const controller = new AttendanceController(service);

router.post("/check-in", controller.checkIn);
router.post("/check-out", controller.checkOut);

router.get("/today", controller.getTodayStatus);
router.get("/today/:userId", controller.getTodayStatus);

router.get("/history", controller.getHistory);
router.get("/history/:userId", controller.getHistory);

router.get("/report", controller.getReport);
router.get("/report/:userId", controller.getReport);

export default router;
