import { Router } from "express";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware";
import { userLibraryController } from "./user-library.controller";

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
