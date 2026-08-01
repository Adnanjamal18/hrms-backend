import type { Request, Response } from "express";
import { prisma } from "../../config/db.js";
import { requireAdmin } from "../../utils/admincheck.js";


export const getAttendanceReport = async (req: Request, res: Response) => {
  const session = await requireAdmin(req, res);
  if (!session) return;

  try {
    const { startDate, endDate } = req.query;
    
   
    const whereClause: any = {};
    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const attendanceRecords = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        user: { select: { fullName: true, email: true } },
      },
      orderBy: { date: "desc" },
    });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch attendance report" });
  }
};

export const getLeaveReport = async (req: Request, res: Response) => {
  const session = await requireAdmin(req, res);
  if (!session) return;

  try {
    const { startDate, endDate, status } = req.query;

    const whereClause: any = {};
    if (startDate && endDate) {
      whereClause.fromDate = { gte: new Date(startDate as string) };
      whereClause.toDate = { lte: new Date(endDate as string) };
    }
    if (status && status !== "ALL") {
      whereClause.approveStatus = status as string;
    }

    const leaveRecords = await prisma.leaveManagement.findMany({
      where: whereClause,
      include: {
        user: { select: { fullName: true, email: true } },
        leaveType: true,
        department: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(leaveRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch leave report" });
  }
};

