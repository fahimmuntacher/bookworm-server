import { Request, Response } from "express";
import { AdminDashboardService } from "./admin-dashboard.service.js";


export const AdminDashboardController = {
  getOverview: async (req: Request, res: Response) => {
    try {
      const data = await AdminDashboardService.getOverview();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
