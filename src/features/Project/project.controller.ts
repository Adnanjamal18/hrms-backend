import { prisma } from "../../config/db.js";
import type { Request, Response } from "express";
import { logger } from "../../utils/logger.js";
import { requireAdminOrSuperAdmin, requireManager } from "../../utils/admincheck.js";
import { auth } from "../auth/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { 
  createProjectSchema, 
  assignProjectManagerSchema, 
  assignProjectEmployeeSchema 
} from "./project.schema.js";

export const createproject = async (req: Request, res: Response) => {
  const session = await requireAdminOrSuperAdmin(req, res);
  if (!session) return;

  try {
    const validatedData = createProjectSchema.parse(req.body);

    logger.info(`Admin creating project: ${validatedData.name}`);
    
    const project = await prisma.project.create({
      data: {
        name: validatedData.name,
        description: validatedData.description || null,
        managerId: validatedData.managerId,
        teamLeadId: validatedData.teamLeadId,
        departmentId: validatedData.departmentId
      }
    });

    res.status(201).json({ message: "Project has been created successfully", project });
  } catch (error: any) {
    logger.error("Error creating project:", error);
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Failed to create project" });
    }
  }
}

export const assignProjectManager = async (req: Request, res: Response) => {
  const session = await requireAdminOrSuperAdmin(req, res);
  if (!session) return;

  try {
    const validatedData = assignProjectManagerSchema.parse(req.body);

    logger.info(`Admin assigning manager to project ID: ${validatedData.id}`);

    const updatedproject = await prisma.project.update({
      where: { id: validatedData.id },
      data: {
        managerId: validatedData.managerId,
        departmentId: validatedData.departmentId
      }
    });

    res.status(200).json({ message: "Assigned project successfully", updatedproject });
  } catch (error: any) {
    logger.error("Error assigning project manager:", error);
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Failed to assign project" });
    }
  }
}

export const assignProjectEmployee = async (req: Request, res: Response) => {
  const session = await requireManager(req, res);
  if (!session) return;

  try {
    const validatedData = assignProjectEmployeeSchema.parse(req.body);

    logger.info(`Manager assigning employee ${validatedData.employeeUserId} to project ${validatedData.projectId}`);

    const project = await prisma.project.findUnique({
      where: { id: validatedData.projectId },
      include: { department: true }
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const isAdmin = session.user.roleId === 1 || session.user.roleId === 2;
    const isProjectManager = project.managerId === session.user.id;
    const isDepartmentManager = project.department.managerId === session.user.id;

    if (!isAdmin && !isProjectManager && !isDepartmentManager) {
      logger.warn(`User ${session.user.id} tried to assign to unauthorized project ${validatedData.projectId}`);
      return res.status(403).json({ error: "You are not authorized to assign employees to this project." });
    }

    const assignment = await prisma.projectTeam.create({
      data: {
        projectId: validatedData.projectId,
        userId: validatedData.employeeUserId
      }
    });

    res.status(201).json({ message: "Employee assigned to project", assignment });
  } catch (error: any) {
    logger.error("Error assigning employee to project:", error);
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Failed to assign employee to project" });
    }
  }
}

export const getMyProjects = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  try {
    logger.info(`Fetching projects for user: ${session.user.id}`);
    
    const myProjects = await prisma.project.findMany({
      where: {
        OR: [
          { managerId: session.user.id },
          { teamLeadId: session.user.id },
          { members: { some: { userId: session.user.id } } }
        ]
      },
      include: {
        department: true,
        manager: { select: { fullName: true } }
      }
    });
    
    res.status(200).json(myProjects);
  } catch (error) {
    logger.error("Error fetching user projects:", error);
    res.status(500).json({ error: "Failed to fetch your projects" });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  const session = await requireAdminOrSuperAdmin(req, res);
  if (!session) return;

  try {
    const projects = await prisma.project.findMany({
      include: {
        department: true,
        manager: { select: { fullName: true } }
      }
    });
    res.status(200).json(projects);
  } catch (error) {
    logger.error("Error fetching all projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};