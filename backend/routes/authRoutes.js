import express from "express";
import { loginAdmin, createAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/create-admin", createAdmin);

export default router;
