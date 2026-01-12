import { NextFunction, Request, Response } from "express";
import { getAuth } from "../modules/user/auth";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

const authMiddleware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = await getAuth();

      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      console.log(session);

      req.user = {
        id: session.user.id!,
        email: session.user.email!,
        role: session.user.role,
      };

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You don't have permission to access this resource!",
        });
      }

      next();
    } catch (err: any) {
      next(err);
    }
  };
};

export default authMiddleware;
