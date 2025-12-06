import bcrypt from "bcryptjs";
import config from "../../config";
import { pool } from "../../config/db";
const createUserToDB = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const hashedPassword = await bcrypt.hash(
    password as string,
    config.bcryptSalt
  );
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role)VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,phone,role`,
    [name, email, hashedPassword, phone, role]
  );
  return result;
};

export const authService = { createUserToDB };
