import { pool } from "../../config/db";

const getUsersFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

export const userService = { getUsersFromDB };
