import { Router } from "express";
import { 
  createproject, 
  assignProjectManager, 
  assignProjectEmployee, 
  getMyProjects,
  getAllProjects
} from "./project.controller.js";

const router = Router();

router.post("/", createproject);
router.put("/assign-manager", assignProjectManager);
router.post("/assign-employee", assignProjectEmployee);
router.get("/my-projects", getMyProjects);
router.get("/", getAllProjects);

export default router;
