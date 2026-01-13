import { ObjectId } from "mongodb";
import { connectDB } from "../../config/db";
import { UserInterface } from "./user.interface";

const COLLECTION = "user";
// Get all users
const getAllUsers = async () => {
  const db = await connectDB();
  return db.collection<UserInterface>(COLLECTION).find().toArray();
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
