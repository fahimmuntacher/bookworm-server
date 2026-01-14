import { Request, Response } from "express";
import { BookService } from "./book.service.js";

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
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create book",
    });
  }
};

// get all books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { search, page, limit, genreId } = req.query;

    const result = await BookService.getAllBooks({
      search: search as string,
      genreId: genreId as string,
      page: Number(page),
      limit: Number(limit),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single book
const getBook = async (req: Request, res: Response) => {
  try {
    const result = await BookService.getBookById(req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Update book (admin)
const updateBook = async (req: Request, res: Response) => {
  try {
    const result = await BookService.updateBook(
      req.params.id as string,
      req.body
    );
    res
      .status(200)
      .json({ success: true, message: "Book updated", data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete book (admin)
const deleteBook = async (req: Request, res: Response) => {
  try {
    await BookService.deleteBook(req.params.id as string);
    res.status(200).json({ success: true, message: "Book deleted" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const BookController = {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
};
