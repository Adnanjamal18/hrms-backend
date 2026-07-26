import { Router } from "express";
import { validate } from "../../middleware/validateRequest.js";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  assignDepartmentSchema,
  generateSignedUrl,
} from "./employee.schema.js";
import { EmployeeController } from "./employee.controller.js";
import { EmployeeService } from "./employee.service.js";
import { EmployeeRepository } from "./employee.repository.js";
import { prisma } from "../../config/db.js";

const router = Router();

const repository = new EmployeeRepository(prisma);
const service = new EmployeeService(repository);
const controller = new EmployeeController(service);

router.post(
  "/createEmployee",
  validate(createEmployeeSchema),
  controller.createEmployee,
);

router.post(
  "/createEmployee/:userId",
  validate(createEmployeeSchema),
  controller.createEmployee,
);

router.put(
  "/updateEmployee/:userId",
  validate(updateEmployeeSchema),
  controller.updateEmployee,
);

router.delete("/deleteEmployee/:userId", controller.deleteEmployee);

router.get("/getEmployeeById/:userId", controller.getEmployeeById);

router.get("/getAllEmployees", controller.getAllEmployees);

router.post(
  "/assignDepartment/:userId",
  validate(assignDepartmentSchema),
  controller.assignEmployees,
);

router.post(
  "/employees/resume/upload-url",
  validate(generateSignedUrl),
  controller.generateSignedUrl,
);

export default router;
