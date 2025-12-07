"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_route_1 = require("./modules/auth/auth.route");
const booking_route_1 = require("./modules/booking/booking.route");
const user_route_1 = require("./modules/user/user.route");
const vehicle_route_1 = require("./modules/vehicles/vehicle.route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api/v1/auth", auth_route_1.router);
exports.app.use("/api/v1/users", user_route_1.userRouter);
exports.app.use("/api/v1/vehicles", vehicle_route_1.vehicleRouter);
exports.app.use("/api/v1/bookings", booking_route_1.bookingRouter);
(0, db_1.default)();
exports.app.get("/", (req, res) => {
    res.send("Vehicle rental system started!");
});
//# sourceMappingURL=app.js.map