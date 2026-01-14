import { Router } from "express";
import { BookRouter } from "./modules/book/book.routes";
import { userRouter } from "./modules/user/user.routes";
import { GenreRouter } from "./modules/genre/genre.routes";
import { reviewRouter } from "./modules/reviews/reviews.routes";
import { TutorialRoutes } from "./modules/tutorials/tutorials.routes";
import { userLibraryRouter } from "./modules/user_libraries/user-library.routes";
import { adminDashboardRoute } from "./modules/admin-dashboard/admin-dashboard.route";

const router = Router();

router.use("/books", BookRouter);
router.use("/users", userRouter);
router.use("/genres", GenreRouter);
router.use("/reviews", reviewRouter);
router.use("/tutorials", TutorialRoutes);
router.use("/library", userLibraryRouter);
router.use("/admin", adminDashboardRoute);

export default router;
