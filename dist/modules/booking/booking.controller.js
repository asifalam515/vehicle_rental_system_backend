"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.createBookingToDB(req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getAllBookings = async (req, res) => {
    try {
        const { role, id } = req.user;
        if (role === "admin") {
            const result = await booking_service_1.bookingService.getAllBookingsFromDB(role, id);
            res.status(200).json({
                success: true,
                message: "Your bookings retrieved successfully",
                data: result,
            });
        }
        else {
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params?.bookingId;
        const { status } = req.body;
        const role = req.user?.role;
        const customerId = req.user?.id;
        const result = await booking_service_1.bookingService.updateBookingInDB(bookingId, status, role, customerId);
        res.status(200).json({
            success: true,
            message: status === "returned"
                ? "Booking marked as returned. Vehicle is now available"
                : "Booking cancelled successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.bookingController = {
    createBooking,
    getAllBookings,
    updateBooking,
};
//# sourceMappingURL=booking.controller.js.map