import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
const config = {
  port: process.env.PORT,
  connectionString: process.env.CONNECTION_STRING,
  bcryptSalt: process.env.BCRYPT_SALT,
  jwtSecret: process.env.JWT_SECRET,
};
export default config;
