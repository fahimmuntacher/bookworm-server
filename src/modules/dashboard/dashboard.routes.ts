import { Router } from "express";
import { dashboardController } from "./dashboard.controller.js";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware(UserRole.USER),
  dashboardController.getDashboard
);

export const userDashboardRouter = router;
