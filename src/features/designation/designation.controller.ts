import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/db.js";
import { logger } from "../../utils/logger.js";

export const createDesignation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Creating designation: ${req.body.post}`);
    const designation = await prisma.designation.create({
      data: {post: req.body.post, description: req.body.description || "" }
    });
    res.status(201).json(designation);
  } catch (error) {
    next(error);
  }
};

export const getAllDesignations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Fetching all designations");
    const designations = await prisma.designation.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(designations);
  } catch (error) {
    next(error);
  }
};

export const updateDesignation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    logger.info(`Updating designation ID: ${id}`);
    const updatedDesignation = await prisma.designation.update({
      where: { id },
      data: { post: req.body.post, description: req.body.description || "" }
    });
    res.json(updatedDesignation);
  } catch (error) {
    next(error);
  }
};

export const deleteDesignation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    logger.info(`Deleting designation ID: ${id}`);
    await prisma.designation.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
