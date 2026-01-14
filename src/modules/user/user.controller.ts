import { Request, Response } from "express";

import { userService } from "./user.service.js";
import { toNodeHandler } from "better-auth/node";
import { getAuth } from "../../lib/auth.js";

// Dynamic import cache for better-auth/node (ES module)
let toNodeHandlerModule: any = null;

const getAllUsers = async (req: Request, res: Response) => {
  const { search, page = 1, limit = 10 } = req.query;
  try {
    const users = await userService.getAllUsers(
      search as string,
      Number(page),
      Number(limit)
    );
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get user details
const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id as string);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get User Session
const getSession = async (req: Request, res: Response) => {
  try {
    const auth = await getAuth();
    const handler = toNodeHandler(auth);
    handler(req, res);
  } catch (error) {
    res.status(500).json({ error: "Failed to get session" });
  }
};

// Update user role
const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
    const updatedUser = await userService.updateUserRole(
      req.params.id as string,
      role as "user" | "admin"
    );
    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res
      .status(200)
      .json({ success: true, message: "Role updated", data: updatedUser });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const userControllers = {
  getAllUsers,
  getUserById,
  getSession,
  updateUserRole,
};
