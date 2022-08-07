import { Router } from "express";
import { profil } from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/authJwt.js";


const router = Router();

router.get("/me", verifyToken, profil);

export default router;