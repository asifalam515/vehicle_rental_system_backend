import { Router } from "express";
import auth from "../../middelware/auth";
import { userController } from "./user.controller";

const router = Router();
router.get("/", auth("admin"), userController.getAllUsers);
export const userRouter = router;
