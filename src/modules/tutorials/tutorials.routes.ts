import express from "express";
import { TutorialController } from "./tutorial.controller";
import authMiddleware, { UserRole } from "../../middleware/auth.middleware";

const router = express.Router();

// Tutorial routes
router.get("/", TutorialController.getAllTutorials);
router.post("/", authMiddleware(UserRole.ADMIN), TutorialController.addTutorial);
router.put("/:id", authMiddleware(UserRole.ADMIN), TutorialController.editTutorial);
router.delete("/:id", authMiddleware(UserRole.ADMIN), TutorialController.deleteTutorial);

export const TutorialRoutes = router;