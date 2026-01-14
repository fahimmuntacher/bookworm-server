import * as BetterAuthModule from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "../config/db.js";

let authInstance: any = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const betterAuth =
    BetterAuthModule.betterAuth ||
    BetterAuthModule.default?.betterAuth ||
    BetterAuthModule;

  const db = await connectDB();

  authInstance = betterAuth({
    database: mongodbAdapter(db),
    baseURL: process.env.ORIGIN_URL, // your production frontend URL
    trustedOrigins: [
      "*.vercel.app",                        // allow any Vercel deployment (preview/prod)
      "https://bookworm-client-khaki.vercel.app", // main frontend
      "http://localhost:3000"                // dev
    ],
    advanced: {
      crossContextCookies: true, // required for cookies
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    secret: process.env.BETTER_AUTH_SECRET || "random_secret_123",
  });

  return authInstance;
};
