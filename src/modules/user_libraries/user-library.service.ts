import { ObjectId } from "mongodb";
import { connectDB } from "../../config/db.js";
import { UserLibrary } from "./user-library.interface.js";

const COLLECTION = "user_libraries";

// Add or update book in library
const upsertLibrary = async (payload: UserLibrary) => {
  const db = await connectDB();

  return db.collection<UserLibrary>(COLLECTION).findOneAndUpdate(
    {
      userId: payload.userId,
      bookId: payload.bookId,
    },
    {
      $set: {
        status: payload.status,
        progress: payload.progress || 0,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true, returnDocument: "after" }
  );
};

// Get user's library
const getMyLibrary = async (userId: string) => {
  const db = await connectDB();

  const library = await db
    .collection(COLLECTION)
    .aggregate([
      // Match user
      { $match: { userId } },

      // Convert bookId to ObjectId
      {
        $addFields: {
          bookObjectId: { $toObjectId: "$bookId" },
        },
      },

      // Join with books collection
      {
        $lookup: {
          from: "books",
          localField: "bookObjectId",
          foreignField: "_id",
          as: "book",
        },
      },

      // Unwind book
      { $unwind: "$book" },

      // Group by status
      {
        $group: {
          _id: "$status",
          books: {
            $push: {
              libraryId: "$_id",
              status: "$status",
              progress: "$progress",
              book: {
                _id: "$book._id",
                title: "$book.title",
                author: "$book.author",
                coverImage: "$book.coverImage",
                averageRating: "$book.averageRating",
              },
            },
          },
        },
      },
    ])
    .toArray();

  // Normalize result
  const result = {
    want: [],
    reading: [],
    read: [],
  } as any;

  library.forEach((item: any) => {
    result[item._id] = item.books;
  });

  return result;
};

const updateLibrary = async (
  id: string,
  userId: string,
  payload: Partial<UserLibrary>
) => {
  const db = await connectDB();

  const result = await db
    .collection<UserLibrary>(COLLECTION)
    .findOneAndUpdate(
      { _id: new ObjectId(id), userId },
      { $set: { ...payload, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

  return result;
};

// Remove book from library
const removeFromLibrary = async (userId: string, bookId: string) => {
  const db = await connectDB();
  return db.collection(COLLECTION).deleteOne({ userId, bookId });
};

export const userLibraryService = {
  upsertLibrary,
  getMyLibrary,
  updateLibrary,
  removeFromLibrary,
};
