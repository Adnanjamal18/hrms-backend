import type { Request, Response, NextFunction } from "express";
import type { EmployeeService } from "./employee.service.js";

export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        experience,
        resumeLink,
        linkedinUrl,
        address,
        accountNumber,
        ifscCode,
        bankName,
        branch,
        username,
        fullName,
        email,
        password,
        mobile,
        roleId,
      } = req.body;

      const employees = await this.service.createEmployee({
        experience,
        resumeLink,
        linkedinUrl,
        address,
        accountNumber,
        ifscCode,
        bankName,
        branch,
        username,
        fullName,
        email,
        password,
        mobile,
        roleId,
      });
      res.status(201).json(employees);
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;

      const {
        experience,
        resumeLink,
        linkedinUrl,
        address,
        accountNumber,
        ifscCode,
        bankName,
        branch,
        username,
        fullName,
        email,
        password,
        mobile,
        roleId,
      } = req.body;

      const updated = await this.service.updateEmployee(userId, {
        experience,
        resumeLink,
        linkedinUrl,
        address,
        accountNumber,
        ifscCode,
        bankName,
        branch,
        username,
        fullName,
        email,
        password,
        mobile,
        roleId,
      });

      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const deleted = await this.service.deleteEmployee(userId);
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const find = await this.service.getEmployeeById(userId);
      res.status(200).json(find);
    } catch (error) {
      next(error);
    }
  };

  getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAll = await this.service.getAllEmployees();
      res.status(200).json(findAll);
    } catch (error) {
      next(error);
    }
  };

  assignEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const { departmentId } = req.body;

      const assigned = await this.service.assignDepartment(
        userId,
        Number(departmentId),
      );

      res.status(200).json(assigned);
    } catch (error) {
      next(error);
    }
  };

  generateSignedUrl = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { fileName, contentType } = req.body;     
      const signedUrl = await this.service.generateSignedUrl(
        fileName,
        contentType,
      );
      res.json(signedUrl);
    } catch (error) {
      next(error);
    }
  };

  getDocumentUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.employeeId as string;
      const getUrl = await this.service.getDocumentUrl(employeeId);
      res.json(getUrl);
    } catch (error) {
      next(error);
    }
  };
}
