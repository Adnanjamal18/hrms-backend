import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/db.js";
import { logger } from "../../utils/logger.js";

export const createEmploymentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Creating employment type: ${req.body.type}`);
    const empType = await prisma.employementType.create({ data: { type: req.body.type, description: req.body.description || "" } });
    res.status(201).json(empType);
  } catch (error) { next(error); }
};

export const getAllEmploymentTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Fetching all employment types");
    const empTypes = await prisma.employementType.findMany();
    res.json(empTypes);
  } catch (error) { next(error); }
};

export const updateEmploymentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    logger.info(`Updating employment type ID: ${id}`);
    const updated = await prisma.employementType.update({
      where: { id },
      data: { ...req.body, description: req.body.description || "" } 
    });
    res.json(updated);
  } catch (error) { next(error); }
};

export const deleteEmploymentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    logger.info(`Deleting employment type ID: ${id}`);
    await prisma.employementType.delete({ where: { id } });
    res.status(204).send();
  } catch (error) { next(error); }
};
