import { pool } from "../../config/db";

const getUsersFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
const updateUserInDB = async (
  payload: Record<string, unknown>,
  userId: string
) => {
  const { name, email, phone, role } = payload;
  const result = await pool.query(
    `    UPDATE users
    SET 
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      phone = COALESCE($3, phone),
      role = COALESCE($4, role)
    WHERE id = $5
    RETURNING id, name, email, phone, role`,
    [name, email, phone, role, userId]
  );
  return result;
};

export const userService = { getUsersFromDB, updateUserInDB };
