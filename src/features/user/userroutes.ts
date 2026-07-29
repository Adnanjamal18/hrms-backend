import { Router } from "express";
import { getallusers, updateauser, deleteUser } from "./usercontroller.js";

const router = Router();

router.get("/", getallusers);
router.patch("/:id", updateauser); // Using PATCH for partial updates
router.delete("/:id", deleteUser);

export default router;
