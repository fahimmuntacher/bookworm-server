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
    secret: process.env.BETTER_AUTH_SECRET!,
  });
};
