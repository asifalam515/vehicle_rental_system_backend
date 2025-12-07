import express, { Request, Response } from "express";
import initDB from "./config/db";
import { router } from "./modules/auth/auth.route";
import { userRouter } from "./modules/user/user.route";
import { vehicleRouter } from "./modules/vehicles/vehicle.route";
export const app = express();
app.use(express.json());
app.use("/api/v1/auth", router);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/vehicles", vehicleRouter);

initDB();
app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle rental system started!");
});
