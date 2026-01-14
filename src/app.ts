import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getAuth } from "./lib/auth.js";
import router from "./index.js";

const app = express();

// Trust Vercel proxy headers
app.set("trust proxy", true);

// CORS — only allow frontend and dev
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin);
      if (!origin) return callback(null, true); // Postman / curl
      if (
        origin === "http://localhost:3000" ||
        origin === "https://bookworm-client-khaki.vercel.app"
      ) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);

// Cookies
app.use(cookieParser());

// Dynamic Better-Auth handler
let toNodeHandlerModule: any = null;
let authHandler: any = null;

const initializeAuthHandler = async () => {
  if (!authHandler) {
    const auth = await getAuth();

    if (!toNodeHandlerModule) {
      toNodeHandlerModule = await import("better-auth/node");
    }

    const { toNodeHandler } = toNodeHandlerModule;
    authHandler = toNodeHandler(auth);
  }
  return authHandler;
};

// Auth routes (must be before express.json)
app.use("/api/auth", async (req, res, next) => {
  try {
    const handler = await initializeAuthHandler();
    return handler(req, res);
  } catch (error) {
    console.error("Auth Handler Error:", error);
    next(error);
  }
});

// JSON parser for other routes
app.use(express.json());

// App routes
app.use("/api/v1", router);

export default app;
