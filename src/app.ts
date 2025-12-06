import express, { Request, Response } from "express";
import initDB from "./config/db";
import { router } from "./modules/auth/auth.route";
export const app = express();
app.use(express.json());
app.use("/api/v1/auth", router);
initDB();
app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle rental system started!");
});
