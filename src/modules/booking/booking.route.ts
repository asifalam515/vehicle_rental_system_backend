import { Router } from "express";
import auth from "../../middelware/auth";
import { bookingController } from "./booking.controller";

const router = Router();
router.post("/", auth("admin", "customer"), bookingController.createBooking);
router.get("/", auth("admin", "customer"), bookingController.getAllBookings);

export const bookingRouter = router;
