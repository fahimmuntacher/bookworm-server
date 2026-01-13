import { Request, Response } from "express";
import { ReviewService } from "./reviews.service";

export const ReviewController = {
  // ----------------------------------------
  // Get reviews for a specific book (approved)
  // ----------------------------------------
  getReviewsByBookId: async (req: Request, res: Response) => {
    try {
      const bookId = req.query.bookId as string;
      if (!bookId) return res.status(400).json({ error: "bookId is required" });

      const reviews = await ReviewService.getReviewsByBookId(bookId);
      res.status(200).json({ data: reviews, total: reviews.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------
  // Add a new review
  // -------------------------------
  addReview: async (req: Request, res: Response) => {
    try {
      const { bookId, userId, userName, bookName, rating, comment } = req.body;

      if (
        !bookId ||
        !userId ||
        !userName ||
        !bookName ||
        rating === undefined ||
        !comment
      ) {
        return res.status(400).json({
          error:
            "bookId, userId, userName, bookName, rating, and comment are required",
        });
      }

      const result = await ReviewService.addReview({
        bookId,
        userId,
        userName,
        bookName,
        rating,
        comment,
      });

      res
        .status(201)
        .json({ message: "Review added successfully", review: result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------
  // Admin: Get pending reviews with user & book info
  // -------------------------------
  getPendingReviews: async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const reviews = await ReviewService.getPendingReviews(page, limit);
      res.status(200).json(reviews);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------
  // Admin: Approve a review
  // -------------------------------
  approveReview: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: "Review ID is required" });

      const review = await ReviewService.approveReview(id as string);
      res.status(200).json({ message: "Review approved", review });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  // -------------------------------
  // Admin: Delete a review
  // -------------------------------
  deleteReview: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: "Review ID is required" });

      const result = await ReviewService.deleteReview(id as string);
      res.status(200).json({ message: "Review deleted", result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
