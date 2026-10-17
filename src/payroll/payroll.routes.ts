import { Router } from "express";
import { PayrollRepository } from "./payroll.repository.js";
import { prisma } from "../config/db.js";
import { PayrollService } from "./payroll.service.js";
import { PayrollController } from "./payroll.controller.js";
const repository = new PayrollRepository(prisma)
const service = new PayrollService(repository)
const controller = new PayrollController(service)
const route = Router();
route.post("/create-payroll/:id",controller.createpayroll)
route.post("/create-salary/:id",controller.createSalary)
route.get("/get-salary/:id",controller.getSalaryById)
route.get("/get-payrolls/:id",controller.getAllPayrollbyId)
route.get("/payslip/:id",controller.payslip)
export default route;