
import { Book } from "./book.interface";

const COLLECTION = "books";
const createBook = async (payload: Book) => {
    // TODO: Replace with actual database insert logic
    const newBook = {
        id: Date.now().toString(),
        ...payload
    };
    return newBook;
}



export const BookService = {
    createBook
}