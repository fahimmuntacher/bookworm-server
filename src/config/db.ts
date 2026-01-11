import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URL as string;

if (!uri) {
  throw new Error("MongoDB URI not found");
}

const client = new MongoClient(uri);

let db: Db;

export const connectDB = async (): Promise<Db> => {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log("✅ MongoDB Connected");
  }
  return db;
};
