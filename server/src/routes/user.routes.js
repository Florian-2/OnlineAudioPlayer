import { Router } from "express";
import { profile, editProfile, deleteAccount } from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/authJwt.js";


const router = Router();

router.get("/me", verifyToken, profile);
router.put("/edit", verifyToken, editProfile);
router.delete("/delete-account", verifyToken, deleteAccount);

export default router;