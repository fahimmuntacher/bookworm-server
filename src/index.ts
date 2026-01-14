import { Router } from "express";
import { BookRouter } from "./modules/book/book.routes.js";
import { userRouter } from "./modules/user/user.routes.js";
import { GenreRouter } from "./modules/genre/genre.routes.js";
import { reviewRouter } from "./modules/reviews/reviews.routes.js";
import { TutorialRoutes } from "./modules/tutorials/tutorials.routes.js";
import { userLibraryRouter } from "./modules/user_libraries/user-library.routes.js";
import { adminDashboardRoute } from "./modules/admin-dashboard/admin-dashboard.route.js";
import { userDashboardRouter } from "./modules/dashboard/dashboard.routes.js";


const router = Router();

router.use("/books", BookRouter);
router.use("/users", userRouter);
router.use("/genres", GenreRouter);
router.use("/reviews", reviewRouter);
router.use("/tutorials", TutorialRoutes);
router.use("/library", userLibraryRouter);
router.use("/admin", adminDashboardRoute);
router.use("/dashboard", userDashboardRouter);

export default router;
