import { Router } from "express";
import auth from "../../middelware/auth";
import { vehicleController } from "./vehicle.controller";

const router = Router();
router.post("/", auth(), vehicleController.addVehicle);
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicleController.getSingleVehicle);
router.put("/:vehicleId", auth("admin"), vehicleController.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehicleController.deleteVehicle);
export const vehicleRouter = router;
