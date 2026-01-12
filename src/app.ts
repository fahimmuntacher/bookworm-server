import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
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

// 🔴 AUTH ROUTES (must be before json)
app.all(/^\/api\/auth\/.*/, async (req, res) => {
  const auth = await getAuth();
  return toNodeHandler(auth)(req, res);
});
// JSON parser (AFTER auth)
app.use(express.json());

// App routes
app.use("/api/v1", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
