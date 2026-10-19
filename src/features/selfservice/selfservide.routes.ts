import { Router } from "express";
import { prisma } from "../../config/db.js";
import { SelfServiceRepository } from "./selfservice.repository.js";
import { SelfServiceService } from "./selfservice.service.js";
import { SelfServiceController } from "./selfservice.conroller.js";
const route=Router()
const repository= new SelfServiceRepository(prisma)
const service = new SelfServiceService(repository)
const controller =new SelfServiceController(service)
route.patch("/update-profile/:id",controller.updateProfile)
route.patch("/update-password/:id",controller.updatepassword)
export default route