import type { Request, Response, NextFunction } from "express";
import { DepartmentService } from "./department.service.js";

export class DepartmentController {
  constructor(private readonly service: DepartmentService) {}
  createDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { departmentName, departmentCode, departmentUrl } = req.body;
      const department = await this.service.createDepartment({
        departmentName,
        departmentCode,
        departmentUrl,
      });
      res.status(201).json(department);
    } catch (error) {
      next(error);
    }
  };

  updateDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const { departmentName, departmentCode, departmentUrl } = req.body;
      const department = await this.service.updateDepartment(Number(id), {
        departmentName,
        departmentCode,
        departmentUrl,
      });
      res.status(200).json(department);
    } catch (error) {
      next(error);
    }
  };

  deleteDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      await this.service.deleteDepartment(Number(id));
      res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  getAllDepartments = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const filtering = (req.query.departmentName as string) || "";
      const search = (req.query.search as string) || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const sortBy = (req.query.sortBy as string) || "createdAt";
      const sortOrder = (req.query.sortOrder as string) || "desc";
      const departments = await this.service.getAllDepartments(
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        filtering,
      );
      res.status(200).json(departments);
    } catch (error) {
      next(error);
    }
  };

  assignManager = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { departmentId } = req.params;
      const { managerId } = req.body;

      const assign = await this.service.assignManager(
        Number(departmentId),
        managerId,
      );

      res.status(200).json(assign);
    } catch (error) {
      next(error);
    }
  };
}
