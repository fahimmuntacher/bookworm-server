import { ObjectId } from "mongodb";
import { Tutorial } from "./tutorials.interface.js";
import { connectDB } from "../../config/db.js";

const COLLECTION = "tutorials";

export const TutorialService = {
  // List all tutorials
  getAllTutorials: async () => {
    const db = await connectDB();
    return db
      .collection<Tutorial>(COLLECTION)
      .find()
      .sort({ createdAt: -1 })
      .toArray();
  },

  // Add a new tutorial
  addTutorial: async (payload: Tutorial) => {
    const db = await connectDB();
    const result = await db.collection<Tutorial>(COLLECTION).insertOne({
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  },

  // Edit a tutorial
  editTutorial: async (id: string, payload: Partial<Tutorial>) => {
    const db = await connectDB();
    const result = await db
      .collection<Tutorial>(COLLECTION)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...payload, updatedAt: new Date() } },
        { returnDocument: "after" }
      );

    return result;
  },

  // Delete a tutorial
  deleteTutorial: async (id: string) => {
    const db = await connectDB();
    const result = await db
      .collection<Tutorial>(COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) throw new Error("Tutorial not found");
    return { success: true };
  },
};
