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
