import { Request, Response } from "express";
import { BookService } from "./book.service";

// create book api
const createBook = async (req: Request, res: Response) => {
  try {
    
    const result = await BookService.createBook(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// get all books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookService.getAllBooks();
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const BookController = {
  createBook,
  getAllBooks
};
