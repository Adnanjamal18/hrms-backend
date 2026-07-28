import type { Request,Response,NextFunction } from "express";
import { prisma } from "../../config/db.js";
import { logger } from "../../utils/logger.js";
import { auth } from "../auth/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const applyLeave = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Securely extract the session from the incoming request headers using Better Auth
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    
    // 2. If there's no valid session, block the request
    if (!session) {
      return res.status(401).json({ message: "Unauthorized. Please sign in." });
    }

    // 3. Extract the real userId from the session!
    const userId = session.user.id; 
    logger.info(`User ${userId} applying for leave from ${req.body.fromDate} to ${req.body.toDate}`);

    const leave = await prisma.leaveManagement.create({
      data: {
        userId: userId,
        departmentId: req.body.departmentId,
        leaveTypeId: req.body.leaveTypeId,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        purpose: req.body.purpose,
        approveStatus: "PENDING",
        requestStatus: "OPEN",
      },
    });

    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (error) {
    logger.error("Error applying for leave:", error);
    next(error);
  }
};

export const cancelLeave = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Cancelling leave request ID: ${req.params.id}`);

    const leave = await prisma.leaveManagement.update({
      where: { id: Number(req.params.id) },
      data: { requestStatus: "CANCELLED" },
 
    });

    res.json({ message: "Leave cancelled", leave });
  } catch (error) {
    logger.error("Error cancelling leave:", error);
    next(error);
  }
};

export const approveLeave = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session || session.user.roleId !== 1) {
      return res.status(403).json({ message: "Forbidden: Only admins can approve leaves." });
    }

    logger.info(`Approving leave request ID: ${req.params.id}`);

    const leave = await prisma.leaveManagement.update({
      where: { id: Number(req.params.id) },
      data: { 
        approveStatus: "APPROVED",
        requestStatus: "CLOSED" 
      },
    });

    res.json({ message: "Leave approved", leave });
  } catch (error) {
    logger.error("Error approving leave:", error);
    next(error);
  }
};

export const rejectLeave = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session || session.user.roleId !== 1) {
      return res.status(403).json({ message: "Forbidden: Only admins can reject leaves." });
    }

    logger.info(`Rejecting leave request ID: ${req.params.id}`);

    const leave = await prisma.leaveManagement.update({
      where: { id: Number(req.params.id) },
      data: { 
        approveStatus: "REJECTED",
        requestStatus: "CLOSED" 
      },
    });

    res.json({ message: "Leave rejected", leave });
  } catch (error) {
    logger.error("Error rejecting leave:", error);
    next(error);
  }
};

export const getAllPendingLeaves = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session || session.user.roleId !== 1) {
       return res.status(403).json({ message: "Forbidden: Only admins can view pending leaves." });
    }

    const pendingLeaves = await prisma.leaveManagement.findMany({
      where: { requestStatus: "OPEN", approveStatus: "PENDING" },
      include: { leaveType: true, user: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json(pendingLeaves);
  } catch (error) {
    logger.error("Error fetching all pending leaves:", error);
    next(error);
  }
};

export const getLeaveHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    
    // Extract userId securely from session rather than URL params
    const userId = session.user.id; 
    
    const history = await prisma.leaveManagement.findMany({
      where: { userId: userId },
      include: { leaveType: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json(history);
  } catch (error) {
    logger.error("Error getting leave history:", error);
    next(error);
  }
};

export const getLeaveBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    
    const userId = session.user.id; 
    
    // For now, returning a static or dynamic calculation. 
    res.json({ totalAllowed: 20, used: 5, remaining: 15 });
  } catch (error) {
    logger.error("Error getting leave balance:", error);
    next(error);
  }
};