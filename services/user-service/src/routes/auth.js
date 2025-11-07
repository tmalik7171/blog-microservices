import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/health", (_req, res) => res.json({ status: "ok", service: "user-service" }));

export default router;
