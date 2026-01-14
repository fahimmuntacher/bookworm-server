import { Router } from "express";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware.js";
import { userLibraryController } from "./user-library.controller.js";

const router = Router();
router.post("/", authMiddleware(UserRole.USER), userLibraryController.upsert);

router.get("/", authMiddleware(UserRole.USER), userLibraryController.myLibrary);

router.put("/:id", authMiddleware(UserRole.USER), userLibraryController.update);

router.delete(
  "/library/:bookId",
  authMiddleware(UserRole.USER),
  userLibraryController.remove
);

export const userLibraryRouter = router;
