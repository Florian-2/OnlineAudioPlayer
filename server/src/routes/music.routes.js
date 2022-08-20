import { Router } from "express";
import { addMusic } from "../controllers/music.controllers.js";
import { verifyToken } from "../middlewares/authJwt.js";
import { uploadFile } from "../middlewares/music.middleware.js";


const router = Router();

router.post("/add", verifyToken, uploadFile, addMusic);

export default router;