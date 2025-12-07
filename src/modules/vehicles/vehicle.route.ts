import { Router } from "express";
import auth from "../../middelware/auth";
import { vehicleController } from "./vehicle.controller";

const router = Router();
router.post("/", auth(), vehicleController.addVehicle);
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicleController.getSingleVehicle);
export const vehicleRouter = router;
