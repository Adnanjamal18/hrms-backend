import type { Request, Response } from "express";
import { prisma } from "../../config/db.js";
import { logger } from "../../utils/logger.js";
import { auth } from "../auth/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { createTaskSchema, updateTaskSchema } from "../../validatiors/tasks.schema.js";

const requireAuth = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return session;
};

export const createTask = async (req: Request, res: Response) => {
  const session = await requireAuth(req, res);
  if (!session) return;

  try {
    const validatedData = createTaskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        taskName: validatedData.taskName,
        taskDescription: validatedData.taskDescription || null,
        storyPoint: validatedData.storyPoint || null,
        priority: validatedData.priority,
        projectId: validatedData.projectId,
        assignedTo: validatedData.assignedTo,
        status: "TODO",
        createdBy: session.user.id
      },
      include: {
        assignedUser: { select: { fullName: true, email: true } },
        createdUser: { select: { fullName: true } }
      }
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error: any) {
    logger.error("Error creating task:", error);
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Failed to create task" });
    }
  }
};

export const getProjectTasks = async (req: Request, res: Response) => {
  const session = await requireAuth(req, res);
  if (!session) return;

  try {
    const projectId = req.params.projectId as string;
    const tasks = await prisma.task.findMany({
      where: { projectId: parseInt(projectId) },
      include: {
        assignedUser: { select: { fullName: true, email: true, image: true } },
        createdUser: { select: { fullName: true } },
        project: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(tasks);
  } catch (error) {
    logger.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const session = await requireAuth(req, res);
  if (!session) return;

  try {
    const taskId = req.params.taskId as string;
    const validatedData = updateTaskSchema.parse(req.body);

    const dataToUpdate: any = {};
    if (validatedData.taskName !== undefined) dataToUpdate.taskName = validatedData.taskName;
    if (validatedData.taskDescription !== undefined) dataToUpdate.taskDescription = validatedData.taskDescription;
    if (validatedData.storyPoint !== undefined) dataToUpdate.storyPoint = validatedData.storyPoint;
    if (validatedData.priority !== undefined) dataToUpdate.priority = validatedData.priority;
    if (validatedData.status !== undefined) dataToUpdate.status = validatedData.status;
    if (validatedData.assignedTo !== undefined) dataToUpdate.assignedTo = validatedData.assignedTo;
    if (validatedData.duration !== undefined) dataToUpdate.duration = validatedData.duration;

    const task = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: dataToUpdate,
      include: {
        assignedUser: { select: { fullName: true, email: true, image: true } }
      }
    });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error: any) {
    logger.error("Error updating task:", error);
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Failed to update task" });
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const session = await requireAuth(req, res);
  if (!session) return;

  try {
    const taskId = req.params.taskId as string;
    await prisma.task.delete({
      where: { id: parseInt(taskId) }
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    logger.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
