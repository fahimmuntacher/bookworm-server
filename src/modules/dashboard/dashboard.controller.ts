import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service.js";

export const dashboardController = {
  getDashboard: async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const data = await DashboardService.getUserDashboard(userId);

    res.json({ data });
  },
};
