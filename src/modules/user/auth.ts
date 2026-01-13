import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {betterAuth} from "better-auth";
import { connectDB } from "../../config/db";

let authInstance: any = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const db = await connectDB();

  authInstance = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    trustedOrigins: [process.env.ORIGIN_URL || "http://localhost:3000"],
    user: {
      additionalFields: {
        role: { type: "string", defaultValue: "user" },
        image: { type: "string", required: false },
      },
    },
  });

  return authInstance;
};
