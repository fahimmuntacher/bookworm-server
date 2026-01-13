import { Book } from "./book.interface";
import { connectDB } from "../../config/db";

const COLLECTION = "books";

// create book
const createBook = async (payload: Book) => {
  const { title } = payload;
  const db = await connectDB();
  const existedBook = await db.collection(COLLECTION).findOne({
    title: title,
  });

  if (existedBook) {
    throw new Error("The book is already added");
  }
  return db.collection<Book>(COLLECTION).insertOne({
    ...payload,
    createdAt: new Date(),
  });
};

// get all books
const getAllBooks = async (options: {
  search?: string;
  genreId?: string;
  page?: number;
  limit?: number;
}) => {
  const db = await connectDB();
  const { search, genreId, page = 1, limit = 10 } = options;

  const query: any = {};

  // Search by title or author (case-insensitive)
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by genreId
  if (genreId) {
    query.genreId = genreId;
  }

  const skip = (page - 1) * limit;
  return db.collection<Book>(COLLECTION).find(query).skip(skip).limit(limit).toArray();
};

export const BookService = {
  createBook,
  getAllBooks,
};
