import { Router } from "express";
import { getallholidays, createholiday, updateholiday, deleteholiday } from "./holiday.controller.js";

const router = Router();

router.get("/", getallholidays);
router.post("/", createholiday);
router.patch("/:id", updateholiday);
router.delete("/:id", deleteholiday);

export default router;