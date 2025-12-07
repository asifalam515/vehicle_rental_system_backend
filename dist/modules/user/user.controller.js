"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.userService.getUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const payload = req.body;
        const loggedInUserId = req.user?.id;
        const role = req.user?.role;
        if (role === "customer" && Number(userId) !== loggedInUserId) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update another user's profile",
            });
        }
        const updatedUser = await user_service_1.userService.updateUserInDB(payload, userId);
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params?.userId;
        if (req.user?.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }
        await user_service_1.userService.deleteUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.userController = { getAllUsers, updateUser, deleteUser };
//# sourceMappingURL=user.controller.js.map