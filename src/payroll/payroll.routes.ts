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