import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Token missing or invalid format." });
    }
    // now get the token
    const token = authHeader.split(" ")[1] as string;
    try {
      if (!token) {
        return res
          .status(500)
          .json({ message: "You are not authenticated user" });
      }
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;
      console.log(decoded);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(500).json({
          error: "UnAuthorized!!",
        });
      }
      next();
    } catch (error: any) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
export default auth;
