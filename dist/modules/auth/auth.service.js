"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const db_1 = require("../../config/db");
const createUserToDB = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const hashedPassword = await bcryptjs_1.default.hash(password, config_1.default.bcryptSalt);
    const result = await db_1.pool.query(`INSERT INTO users(name,email,password,phone,role)VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,phone,role`, [name, email, hashedPassword, phone, role]);
    return result;
};
const loginUserToDB = async (email, password) => {
    // find user by email
    const result = await db_1.pool.query(`SELECT id, name, email, phone, role,password  FROM users WHERE email=$1`, [email]);
    // if there are no user
    if (result.rows.length === 0) {
        throw new Error("User not found");
    }
    // if there are user then check his password
    const user = result.rows[0];
    const isMatched = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatched) {
        throw new Error("Incorrect password");
    }
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    //create token by jwt
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, {
        expiresIn: "7d",
    });
    return { token, user };
};
exports.authService = { createUserToDB, loginUserToDB };
//# sourceMappingURL=auth.service.js.map