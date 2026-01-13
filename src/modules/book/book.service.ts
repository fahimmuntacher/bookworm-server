import { Book } from "./book.interface";
import { connectDB } from "../../config/db";
import { ObjectId } from "mongodb";

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
  return db
    .collection<Book>(COLLECTION)
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();
};

// Get single book by ID
const getBookById = async (id: string) => {
  const db = await connectDB();
  const book = await db
    .collection<Book>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
  if (!book) throw new Error("Book not found");
  return book;
};

// Update book by ID
const updateBook = async (id: string, payload: Partial<Book>) => {
  const db = await connectDB();
  const result = await db
    .collection<Book>(COLLECTION)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...payload, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

  return result;
};


// Delete book by ID
const deleteBook = async (id: string) => {
  const db = await connectDB();
  const result = await db.collection<Book>(COLLECTION).deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) throw new Error("Book not found");
  return true;
};


export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
