import { pool } from "../../config/db";

const getUsersFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
const updateUserInDB = async (
  payload: Record<string, unknown>,
  userId: string
) => {
  const { name, email, phone, role, password } = payload;
  const result = await pool.query(
    `    UPDATE users
    SET 
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      phone = COALESCE($3, phone),
      role = COALESCE($4, role),
        password = COALESCE($5, password),

    WHERE id = $6
    RETURNING id, name, email, phone, role`,
    [name, email, phone, role, password, userId]
  );
  return result;
};
const deleteUserFromDB = async (userId: string) => {
  const userCheck = await pool.query(`SELECT id FROM users WHERE id=$1`, [
    userId,
  ]);
  if (userCheck.rows.length === 0) {
    throw new Error("User not found");
  }
  const activeBooking = await pool.query(
    `SELECT id FROM bookings WHERE customer_id=$1 AND status='active'`,
    [userId]
  );
  if (activeBooking.rows.length > 0) {
    throw new Error("Cannot delete user with active bookings");
  }
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
  return result;
};

export const userService = { getUsersFromDB, updateUserInDB, deleteUserFromDB };
