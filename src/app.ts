import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getAuth } from "./modules/user/auth";
import router from ".";

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.ORIGIN_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Cookies (REQUIRED for better-auth)
app.use(cookieParser());

// Dynamic import for better-auth/node (ES module)
let toNodeHandlerModule: any = null;
let authHandler: any = null;

// Initialize the auth handler once
const initializeAuthHandler = async () => {
  if (!authHandler) {
    const auth = await getAuth();

    // Dynamic import for ES module
    if (!toNodeHandlerModule) {
      toNodeHandlerModule = await import("better-auth/node");
    }

    const { toNodeHandler } = toNodeHandlerModule;
    authHandler = toNodeHandler(auth);
  }
  return authHandler;
};

// Auth routes - must be BEFORE express.json() so better-auth can read raw body
app.all(/^\/api\/auth\/.*/, async (req, res, next) => {
  try {
    const handler = await initializeAuthHandler();
    return handler(req, res);
  } catch (error) {
    next(error);
  }
});

// JSON parser (AFTER auth routes - only for non-auth routes)
app.use(express.json());

// App routes
app.use("/api/v1", router);

export default app;
