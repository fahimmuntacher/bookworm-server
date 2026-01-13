import { Router } from "express";
import { BookRouter } from "./modules/book/book.routes";
import { userRouter } from "./modules/user/user.routes";
import { GenreRouter } from "./modules/genre/genre.routes";

const router = Router();

router.use("/books", BookRouter);
router.use("/users", userRouter);
router.use("/genre", GenreRouter);

export default router;
