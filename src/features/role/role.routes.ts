import { Router } from "express";
import { createRole, getAllRoles, deleteRole } from "./role.controller.js";

const router = Router();

router.post("/", createRole);
router.get("/", getAllRoles);
router.delete("/:id", deleteRole);

export default router;
