import { Router } from "express";
import { userSignupSchema, userLoginSchema } from "../schemas/registerUser.schemas.js";
import { signup, login, logout, refreshToken } from "../controllers/auth.controllers.js";
import { checkFormIsValid } from "../middlewares/verifySignup.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.post("/signup", [userSignupSchema, checkFormIsValid], signup);
router.post("/login", [userLoginSchema, checkFormIsValid], login);
router.post("/refresh", refreshToken);
router.delete("/logout", logout);

export default router;