"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middelware/auth"));
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)("admin"), user_controller_1.userController.getAllUsers);
router.patch("/:userId", (0, auth_1.default)("admin", "customer"), user_controller_1.userController.updateUser);
router.delete("/:userId", (0, auth_1.default)("admin"), user_controller_1.userController.deleteUser);
exports.userRouter = router;
//# sourceMappingURL=user.route.js.map