import { Router } from "express";
import authRoutes from "./auth.routes.js";
import usersRoutes from "./user.routes.js";
import musicRoutes from "./music.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", usersRoutes);
router.use("/music", musicRoutes);

export default router;