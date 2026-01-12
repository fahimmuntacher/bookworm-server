import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export const connectDB = async () => {
  if (client) return client.db();

  client = new MongoClient(process.env.MONGODB_URL as string);
  await client.connect();

  console.log("✅ MongoDB connected");

  return client.db();
};
