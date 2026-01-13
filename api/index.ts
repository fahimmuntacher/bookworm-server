// Vercel automatically loads environment variables from .env files
// Only load dotenv in development or if needed
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

import app from "../src/app";

// Vercel serverless function handler
export default app;

