import { ObjectId } from "mongodb";
import { connectDB } from "../../config/db.js";
import { Review } from "./review.interface.js";

const COLLECTION = "reviews";

export const ReviewService = {
  // Get reviews for a book (approved only)
  getReviewsByBookId: async (bookId: string) => {
    const db = await connectDB();
    return db
      .collection<Review>(COLLECTION)
      .find({ bookId, status: "approved" })
      .sort({ createdAt: -1 })
      .toArray();
  },

  // Add a new review (status pending by default)
  addReview: async (payload: Review) => {
    const db = await connectDB();
    const result = await db.collection<Review>(COLLECTION).insertOne({
      ...payload, 
      status: "pending",
      createdAt: new Date(),
    });
    return result;
  },

  // Get all pending reviews (admin)
  getPendingReviews: async (page = 1, limit = 10) => {
    const db = await connectDB();
    const skip = (page - 1) * limit;
    const total = await db
      .collection<Review>(COLLECTION)
      .countDocuments({ status: "pending" });

    const reviews = await db
      .collection<Review>(COLLECTION)
      .find({ status: "pending" })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return { total, data: reviews };
  },

  // Approve a review
  approveReview: async (id: string) => {
    const db = await connectDB();
    const result = await db
      .collection<Review>(COLLECTION)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { status: "approved", updatedAt: new Date() } },
        { returnDocument: "after" }
      );

    return result;
  },

  // Delete a review
  deleteReview: async (id: string) => {
    const db = await connectDB();
    const result = await db
      .collection<Review>(COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) throw new Error("Review not found");
    return { success: true };
  },
};
