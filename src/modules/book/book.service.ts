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

const getAllBooks = async () => {
    const db = await connectDB();
    return db.collection<Book>(COLLECTION).find().toArray()
}

export const BookService = {
  createBook,
  getAllBooks
};

