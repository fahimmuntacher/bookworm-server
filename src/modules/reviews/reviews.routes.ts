import { Router } from "express";
import { ReviewController } from "./reviews.controller.js";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", ReviewController.getReviewsByBookId); // /api/reviews?bookId=123
router.post("/", authMiddleware(UserRole.USER), ReviewController.addReview);

// Admin routes
router.get(
  "/pending",
  authMiddleware(UserRole.ADMIN),
  ReviewController.getPendingReviews
);
router.put(
  "/:id/approve",
  authMiddleware(UserRole.ADMIN),
  ReviewController.approveReview
);
router.delete(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  ReviewController.deleteReview
);

export const reviewRouter = router;
