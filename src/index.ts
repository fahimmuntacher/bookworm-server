import { Router } from "express";
import { BookRouter } from "./modules/book/book.routes";
import { userRouter } from "./modules/user/user.routes";

const router = Router();

router.use("/books", BookRouter);
router.use("/user", userRouter);

export default router;
