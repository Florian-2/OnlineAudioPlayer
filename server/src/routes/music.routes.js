import { Router } from "express";
import { addMusic } from "../controllers/music.controllers.js";
import { verifyToken } from "../middlewares/authJwt.js";
import { upload } from "../config/multer.config.js";


const router = Router();

router.post("/add", verifyToken, upload.array("musics"), addMusic);

export default router;