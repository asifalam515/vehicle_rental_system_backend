import { Router } from "express";
import auth from "../../middelware/auth";
import { vehicleController } from "./vehicle.controller";

const router = Router();
router.post("/", auth(), vehicleController.addVehicle);
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicleController.getSingleVehicle);
router.patch(
  "/:vehicleId",
  auth("admin"),
  vehicleController.updateVehicleFromDB
);
router.delete("/:vehicleId", auth("admin"), vehicleController.deleteVehicle);
export const vehicleRouter = router;
