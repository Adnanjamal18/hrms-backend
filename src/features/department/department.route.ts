import { Router } from "express";
import { validate } from "../../middleware/validateRequest.js";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./department.schema.js";
import { DepartmentController } from "./department.controller.js";
import { DepartmentService } from "./department.service.js";
import { prisma } from "../../config/db.js";
import { DepartmentRepositary } from "./department.repositary.js";

const router = Router();

const repositary = new DepartmentRepositary(prisma);
const service = new DepartmentService(repositary);
const controller = new DepartmentController(service);

router.post(
  "/createDepartment",
  validate(createDepartmentSchema),
  controller.createDepartment,
);

router.put(
  "/updateDepartment/:id",
  validate(updateDepartmentSchema),
  controller.updateDepartment,
);

router.delete("/deleteDepartment/:id", controller.deleteDepartment);

router.get("/getAllDepartments", controller.getAllDepartments);

router.post(
  "/departments/:departmentId/assign-manager",
  controller.assignManager,
);

export default router;
