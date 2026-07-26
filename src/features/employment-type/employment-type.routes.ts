import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { employmentTypeSchema } from "../../validatiors/employment-type.validator.js";
import { createEmploymentType, getAllEmploymentTypes, updateEmploymentType, deleteEmploymentType } from "./employment-type.controller.js";

const router = Router();

router.post("/", validateRequest(employmentTypeSchema), createEmploymentType);
router.get("/", getAllEmploymentTypes);
router.patch("/:id", validateRequest(employmentTypeSchema.partial()), updateEmploymentType);
router.delete("/:id", deleteEmploymentType);

export default router;
