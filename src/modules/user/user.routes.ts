import { Router } from "express";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware.js";
import { userControllers } from "./user.controller.js";

const router = Router();

router.get("/", authMiddleware(UserRole.ADMIN), userControllers.getAllUsers);
router.get("/:id", authMiddleware(UserRole.ADMIN), userControllers.getUserById);
router.put("/:id/role", authMiddleware(UserRole.ADMIN), userControllers.updateUserRole);


router.get("/session", userControllers.getSession);

export const userRouter = router;
