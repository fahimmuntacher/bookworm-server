import { Router } from "express";
import { BookController } from "./book.controller";

const router = Router();

router.post("/", BookController.createBook);
router.get("/", BookController.getAllBooks);

export const BookRouter = router;
