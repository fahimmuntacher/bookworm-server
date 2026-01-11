import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "../../config/db";

export const getAuth = async () => {
  const db = await connectDB();

  return betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
      enabled: true,
    },
    trustedOrigins: [process.env.TRUSTED_ORIGINS || "http://localhost:3000"],
    user: {
      additionalFields: {
        role: {
          type: "string",
          defaultValue: "user",
          required: false,
        },
        image: {
          type: "string",
          required: false,
        },
      },
    },
  });
};
