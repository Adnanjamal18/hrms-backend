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
      const userId = Number(req.params.userId);

      const {
        experience,
        resumeLink,
        linkedinUrl,
        address,
        accountNumber,
        ifscCode,
        bankName,
        branch,
      } = req.body;

      const updated = await this.service.updateEmployee(Number(userId), {
        experience,
        resumeLink,
        linkedinUrl,
        address,
        accountNumber,
        ifscCode,
        bankName,
        branch,
      });

      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const deleted = await this.service.deleteEmployee(Number(userId));
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const find = await this.service.getEmployeeById(Number(userId));
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
      const userId = Number(req.params.userId);
      const { departmentId } = req.body;

      const assigned = await this.service.assignDepartment(
        userId,
        departmentId,
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
    const { fileName, contentType } = req.body;
    const signedUrl = await this.service.generateSignedUrl(
      fileName,
      contentType,
    );
    res.json(signedUrl);
  };

  getDocumentUrl = async (req: Request, res: Response, next: NextFunction) => {
    const { employeeId } = req.params;
    const getUrl = await this.service.getDocumentUrl(Number(employeeId));
    res.json(getUrl);
  };
}
