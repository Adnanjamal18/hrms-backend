import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/db.js";
import { logger } from "../../utils/logger.js";

export const createLeaveType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Creating leave type: ${req.body.type}`);
    const leaveType = await prisma.leavetype.create({ data: { type: req.body.type, description: req.body.description || "" } });
    res.status(201).json(leaveType);
  } catch (error) { next(error); }
};

export const getAllLeaveTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Fetching all leave types");
    const leaveTypes = await prisma.leavetype.findMany();
    res.json(leaveTypes);
  } catch (error) { next(error); }
};

export const updateLeaveType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    logger.info(`Updating leave type ID: ${id}`);
    const updated = await prisma.leavetype.update({
      where: { id },
      data: { ...req.body, description: req.body.description || "" } 
    });
    res.json(updated);
  } catch (error) { next(error); }
};

export const deleteLeaveType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    logger.info(`Deleting leave type ID: ${id}`);
    await prisma.leavetype.delete({ where: { id } });
    res.status(204).send();
  } catch (error) { next(error); }
};
