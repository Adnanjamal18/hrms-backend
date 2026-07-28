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
import { MailService } from "../../lib/services/mail.service.js";

const router = Router();

const repository = new EmployeeRepository(prisma);
const mailService = new MailService();
const service = new EmployeeService(repository, mailService);
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
  "/resume/upload-url",
  validate(generateSignedUrl),
  controller.generateSignedUrl,
);

router.post(
  "/employees/resume/upload-url",
  validate(generateSignedUrl),
  controller.generateSignedUrl,
);

router.get("/getDocumentUrl/:userId", controller.getDocumentUrl);

router.delete("/deleteDocument/:userId", controller.deleteDocument);

router.post("/sendInvite/:userId", controller.sendInvitation);
router.post("/sendInvitation/:userId", controller.sendInvitation);

router.post("/activate", controller.activateAccount);

export default router;
