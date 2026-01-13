import { Request, Response } from "express";
import { getAuth } from "./auth";
import { toNodeHandler } from "better-auth/node";

const getSession = async (req: Request, res: Response) => {
  try {
    const auth = await getAuth();
    const handler = toNodeHandler(auth);
    handler(req, res);
  } catch (error) {
    res.status(500).json({ error: "Failed to get session" });
  }
};

export const userControllers = {
    getSession
};
