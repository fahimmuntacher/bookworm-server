import express from "express";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware.js";
import { AdminDashboardController } from "./admin-dashboard.controller.js";



const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware(UserRole.ADMIN),
  AdminDashboardController.getOverview
);

export const adminDashboardRoute = router;
