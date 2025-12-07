"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../config/db");
const getUsersFromDB = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
const updateUserInDB = async (payload, userId) => {
    const { name, email, phone, role } = payload;
    const result = await db_1.pool.query(`    UPDATE users
    SET 
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      phone = COALESCE($3, phone),
      role = COALESCE($4, role)
    WHERE id = $5
    RETURNING id, name, email, phone, role`, [name, email, phone, role, userId]);
    return result;
};
const deleteUserFromDB = async (userId) => {
    const userCheck = await db_1.pool.query(`SELECT id FROM users WHERE id=$1`, [
        userId,
    ]);
    if (userCheck.rows.length === 0) {
        throw new Error("User not found");
    }
    const activeBooking = await db_1.pool.query(`SELECT id FROM bookings WHERE customer_id=$1 AND status='active'`, [userId]);
    if (activeBooking.rows.length > 0) {
        throw new Error("Cannot delete user with active bookings");
    }
    const result = await db_1.pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
    return result;
};
exports.userService = { getUsersFromDB, updateUserInDB, deleteUserFromDB };
//# sourceMappingURL=user.service.js.map