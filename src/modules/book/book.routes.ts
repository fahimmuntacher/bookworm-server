import { Router } from "express";
import { BookController } from "./book.controller.js";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware.js";



const router = Router();

router.get("/", BookController.getAllBooks);
router.get("/:id", BookController.getBook);

// Admin routes
router.post("/", authMiddleware(UserRole.ADMIN), BookController.createBook);
router.put("/:id", authMiddleware(UserRole.ADMIN), BookController.updateBook);
router.delete("/:id", authMiddleware(UserRole.ADMIN), BookController.deleteBook);


export const BookRouter = router;
