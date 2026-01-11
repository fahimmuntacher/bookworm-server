import express, { Application, Router } from "express";
import cors from "cors";
import router from ".";
const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1", router);
export default app;
