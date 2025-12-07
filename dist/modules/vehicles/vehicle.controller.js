"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const addVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.addVehicleToDB(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getAllVehicles = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.getAllVehiclesFromDB();
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: result.rows,
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getSingleVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehicle_service_1.vehicleService.getSingleVehicleFromDB(vehicleId);
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: result.rows[0],
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateVehicleFromDB = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehicle_service_1.vehicleService.updateVehicleFromDB(req.body, vehicleId);
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles Updated",
                data: result.rows[0],
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const role = req.user?.role;
        if (role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }
        const result = await vehicle_service_1.vehicleService.deleteVehicleFromDB(vehicleId);
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.vehicleController = {
    addVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicleFromDB,
    deleteVehicle,
};
//# sourceMappingURL=vehicle.controller.js.map