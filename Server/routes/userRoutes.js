import { Router } from "express";
import { getUser, register } from "../controllers/auth.js";

const router = Router();

router.post("/", register);
router.get("/:wallet", getUser);

export default router;
