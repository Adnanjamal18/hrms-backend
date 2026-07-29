import type { Request, Response, NextFunction } from "express";
import type { AttendanceService } from "./attendance.service.js";

export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  checkIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, notes } = req.body;
      const record = await this.service.checkIn(userId, notes);
      res.status(201).json({
        message: "Check-in successful",
        data: record,
      });
    } catch (error) {
      next(error);
    }
  };

  checkOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const record = await this.service.checkOut(userId);
      res.status(200).json({
        message: "Check-out successful",
        data: record,
      });
    } catch (error) {
      next(error);
    }
  };

  getTodayStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req.params.userId || req.query.userId) as string;
      const status = await this.service.getTodayStatus(userId);
      res.json(status);
    } catch (error) {
      next(error);
    }
  };

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req.params.userId || req.query.userId) as string;
      const history = await this.service.getHistory(userId);
      res.json(history);
    } catch (error) {
      next(error);
    }
  };

  getReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req.params.userId || req.query.userId) as string;
      const report = await this.service.getReport(userId);
      res.json(report);
    } catch (error) {
      next(error);
    }
  };
}
