import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/registration", userControllers.userRegistration);

export const userRouter = router;
