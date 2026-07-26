import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { designationSchema } from "../../validatiors/designation.validator.js";
import { createDesignation, updateDesignation } from "./designation.controller.js";

const router = Router();

router.post("/", validateRequest(designationSchema), createDesignation);
router.patch("/:id", validateRequest(designationSchema.partial()), updateDesignation);

export default router;
