"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middelware/auth"));
const vehicle_controller_1 = require("./vehicle.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(), vehicle_controller_1.vehicleController.addVehicle);
router.get("/", vehicle_controller_1.vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicle_controller_1.vehicleController.getSingleVehicle);
router.patch("/:vehicleId", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.updateVehicleFromDB);
router.delete("/:vehicleId", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.deleteVehicle);
exports.vehicleRouter = router;
//# sourceMappingURL=vehicle.route.js.map