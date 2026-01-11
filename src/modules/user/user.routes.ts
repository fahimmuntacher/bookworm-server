import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/register", userControllers.userRegistration);
router.post("/signin", userControllers.userSignIn);

export const userRouter = router;
