"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "Unauthorized. Token missing or invalid format." });
        }
        // now get the token
        const token = authHeader.split(" ")[1];
        try {
            if (!token) {
                return res
                    .status(500)
                    .json({ message: "You are not authenticated user" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            console.log(decoded);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(500).json({
                    error: "UnAuthorized!!",
                });
            }
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    };
};
exports.default = auth;
//# sourceMappingURL=auth.js.map