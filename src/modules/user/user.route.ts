import { Router } from "express";
import auth from "../../middelware/auth";
import { userController } from "./user.controller";

const router = Router();
router.get("/", auth("admin"), userController.getAllUsers);
router.patch("/:userId", auth("admin", "customer"), userController.updateUser);
export const userRouter = router;
