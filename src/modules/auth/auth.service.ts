import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../config/db";
import { JwtPayload } from "./../../../node_modules/@types/jsonwebtoken/index.d";
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
const loginUserToDB = async (email: string, password: string) => {
  // find user by email
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  // if there are no user
  if (result.rows.length === 0) {
    return null;
  }
  // if there are user then check his password
  const user = result.rows[0];
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return false;
  }
  const payload = {
    email: user.email,
    password: user.password,
    role: user.role,
  } as JwtPayload;
  //create token by jwt
  const token = jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: "7d",
  });
  return { token, user };
};

export const authService = { createUserToDB, loginUserToDB };
