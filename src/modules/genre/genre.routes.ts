import { Router } from "express";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware";
import { GenreController } from "./genre.controller";

const router = Router();

// Public: Get all genres
router.get("/", GenreController.getAllGenres);

// Public: Get single genre
router.get("/:id", GenreController.getGenreById);

// Admin only: create, update, delete
router.post("/", authMiddleware(UserRole.ADMIN), GenreController.createGenre);
router.put("/:id", authMiddleware(UserRole.ADMIN), GenreController.updateGenre);
router.delete("/:id", authMiddleware(UserRole.ADMIN), GenreController.deleteGenre);

export const GenreRouter = router;