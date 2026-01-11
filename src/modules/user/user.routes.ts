import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/register", userControllers.userRegistration);
router.post("/signin", userControllers.userSignIn);
router.post("/signout", userControllers.userSignOut);

export const userRouter = router;
