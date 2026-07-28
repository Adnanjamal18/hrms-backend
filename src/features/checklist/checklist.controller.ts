import type { Request, Response, NextFunction } from "express";
import type { ChecklistService } from "./checklist.service.js";

export class ChecklistController {
  constructor(private readonly service: ChecklistService) {}

  getChecklist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const checklist = await this.service.getChecklist(userId);
      res.status(200).json(checklist);
    } catch (error) {
      next(error);
    }
  };

  updateChecklist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const updated = await this.service.updateChecklist(userId, req.body);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

  getAllChecklists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checklists = await this.service.getAllChecklists();
      res.status(200).json(checklists);
    } catch (error) {
      next(error);
    }
  };
}
