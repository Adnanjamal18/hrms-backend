import { Router } from "express";
import { createTask, getProjectTasks, updateTask, deleteTask } from "./taskcontriller.js";

const router = Router();

router.post("/", createTask);
router.get("/project/:projectId", getProjectTasks);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
