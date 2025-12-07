import { Router } from "express";
import { authController } from "./auth.controller";

export const router = Router();

router.post("/signup", authController.createUser);
// router.post("/signin");
