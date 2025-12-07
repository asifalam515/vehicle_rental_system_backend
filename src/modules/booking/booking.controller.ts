import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBookingToDB(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user as JwtPayload;
    if (role === "admin") {
      const result = await bookingService.getAllBookingsFromDB(role, id);
      res.status(200).json({
        success: true,
        message: "Your bookings retrieved successfully",
        data: result,
      });
    } else {
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const bookingController = { createBooking, getAllBookings };
