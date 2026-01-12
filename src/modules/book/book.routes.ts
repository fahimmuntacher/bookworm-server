import { Router } from "express";
import { BookController } from "./book.controller";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware";



const router = Router();

router.get("/", BookController.getAllBooks);

router.post("/", authMiddleware(UserRole.ADMIN), BookController.createBook);

export const BookRouter = router;
