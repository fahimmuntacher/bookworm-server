import { Router } from "express";
import { BookController } from "./book.controller";

const router = Router();

router.get("/", BookController.getAllBooks);

router.post("/", BookController.createBook);


export const BookRouter = router;
