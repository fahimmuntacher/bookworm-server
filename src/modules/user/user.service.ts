import { ObjectId } from "mongodb";
import { connectDB } from "../../config/db";
import { UserInterface } from "./user.interface";

const COLLECTION = "user";
// Get all users with optional search and pagination
const getAllUsers = async (search?: string, page = 1, limit = 10) => {
  const db = await connectDB();
  const query: any = {};

  // Search by email (case-insensitive)
  if (search) {
    query.email = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;
  const total = await db.collection<UserInterface>(COLLECTION).countDocuments(query);

  const users = await db
    .collection<UserInterface>(COLLECTION)
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();

  return { total, page, limit, data: users };
};

// Get single user by ID
const getUserById = async (id: string) => {
  const db = await connectDB();
  return db
    .collection<UserInterface>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
};

// Update user role
const updateUserRole = async (id: string, role: "user" | "admin") => {
  const db = await connectDB();
  const result = await db
    .collection<UserInterface>(COLLECTION)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { role, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
  return result;
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUserRole,
};
