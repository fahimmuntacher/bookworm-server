import { Router } from "express";
import { BookRouter } from "./modules/book/book.routes";

const router = Router();

router.use("/books", BookRouter);

export default router;
