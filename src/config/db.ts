import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export const connectDB = async () => {
  // Reuse existing connection if available and still connected
  if (client) {
    try {
      await client.db().admin().ping();
      return client.db();
    } catch (error) {
      // Connection lost, reset client
      client = null;
    }
  }

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is not set");
  }

  client = new MongoClient(process.env.MONGODB_URL);
  await client.connect();

  console.log("✅ MongoDB connected");

  return client.db();
};
