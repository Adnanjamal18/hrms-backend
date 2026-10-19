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

export const getPayrollReport = async (req: Request, res: Response) => {
  const session = await requireAdmin(req, res);
  if (!session) return;

  try {
    const { startDate, endDate } = req.query;

    const whereClause: any = {};
    if (startDate && endDate) {
      whereClause.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const payrollRecords = await prisma.payroll.findMany({
      where: whereClause,
      include: {
        user: { select: { fullName: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(payrollRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch payroll report" });
  }
};

export const getProjectReport = async (req: Request, res: Response) => {
  const session = await requireAdmin(req, res);
  if (!session) return;

  try {
    const { startDate, endDate, status } = req.query;

    const whereClause: any = {};
    if (startDate && endDate) {
      whereClause.startDate = { gte: new Date(startDate as string) };
      whereClause.endDate = { lte: new Date(endDate as string) };
    }
    if (status) {
      whereClause.status = status as string;
    }

    const projectRecords = await prisma.project.findMany({
      where: whereClause,
      include: {
        manager: { select: { fullName: true, email: true } },
        teamLead: { select: { fullName: true, email: true } },
        department: { select: { departmentName: true } },
        tasks: { select: { taskName: true, status: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(projectRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch project report" });
  }
};

