import { Router } from "express";
import { ChecklistRepository } from "./checklist.repository.js";
import { ChecklistService } from "./checklist.service.js";
import { ChecklistController } from "./checklist.controller.js";
import { prisma } from "../../config/db.js";

const router = Router();

const repository = new ChecklistRepository(prisma);
const service = new ChecklistService(repository);
const controller = new ChecklistController(service);

router.get("/all", controller.getAllChecklists);
router.get("/:userId", controller.getChecklist);
router.put("/:userId", controller.updateChecklist);

export default router;
