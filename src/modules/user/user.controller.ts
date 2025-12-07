import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const payload = req.body;
    const loggedInUserId = req.user?.id;
    const role = req.user?.role;
    if (role === "customer" && Number(userId) !== loggedInUserId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update another user's profile",
      });
    }
    const updatedUser = await userService.updateUserInDB(payload, userId);
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
export const userController = { getAllUsers, updateUser };
