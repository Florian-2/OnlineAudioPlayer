import { Router } from "express";
import { profile, editProfile } from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/authJwt.js";


const router = Router();

router.get("/me", verifyToken, profile);
router.put("/edit", verifyToken, editProfile);

export default router;