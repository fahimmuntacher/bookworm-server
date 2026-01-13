import { connectDB } from "../../config/db";

let authInstance: any = null;
let betterAuthModule: any = null;
let mongodbAdapterModule: any = null;

export const getAuth = async () => {
  const db = await connectDB();
  if (authInstance) return authInstance;

  // Dynamic import for ES modules (better-auth)
  if (!betterAuthModule) {
    betterAuthModule = await import("better-auth");
  }
  
  if (!mongodbAdapterModule) {
    mongodbAdapterModule = await import("better-auth/adapters/mongodb");
  }

  const { betterAuth } = betterAuthModule;
  const { mongodbAdapter } = mongodbAdapterModule;

  authInstance = (betterAuth as any)({
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
