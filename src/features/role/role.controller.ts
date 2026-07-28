import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/db.js";
import { logger } from "../../utils/logger.js";

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Creating role: ${req.body.rolename}`);
    const role = await prisma.role.create({
      data: {
        rolename: req.body.rolename,
        rolecode: req.body.rolecode,
      }
    });
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

export const getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Fetching all roles");
    const roles = await prisma.role.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    logger.info(`Deleting role ID: ${id}`);
    await prisma.role.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
