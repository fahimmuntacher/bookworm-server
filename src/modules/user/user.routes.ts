import { Router } from "express";

const router = Router();

// router.get("/health", (_, res) => {
//   res.json({ status: "OK" });
// });

// // Protected route example
// router.get("/me", requireAuth, (req, res) => {
//   res.json({
//     user: req.user,
//   });
// });

// // Admin-only example
// router.get("/admin", requireAuth, requireRole("admin"), (req, res) => {
//   res.json({
//     message: "Welcome admin",
//   });
// });

export const userRouter = router;
