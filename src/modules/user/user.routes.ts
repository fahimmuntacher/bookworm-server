import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.get("/session", userControllers.getSession);

export const userRouter = router;
