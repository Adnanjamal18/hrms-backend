import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { designationSchema } from "../../validatiors/designation.validator.js";
import { createDesignation, updateDesignation, getAllDesignations, deleteDesignation } from "./designation.controller.js";

const router = Router();

router.get("/", getAllDesignations);
router.post("/", validateRequest(designationSchema), createDesignation);
router.patch("/:id", validateRequest(designationSchema.partial()), updateDesignation);
router.delete("/:id", deleteDesignation);

export default router;
