import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const addVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.addVehicleToDB(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehiclesFromDB();
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehicleService.getSingleVehicleFromDB(
      vehicleId as string
    );
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateVehicleFromDB = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehicleService.updateVehicleFromDB(
      req.body,
      vehicleId as string
    );
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehicleController = {
  addVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicleFromDB,
};
