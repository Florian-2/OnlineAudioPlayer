import { Router } from "express";
import { addMusic, getAllMusics } from "../controllers/music.controllers.js";
import { verifyToken } from "../middlewares/authJwt.js";
import { uploadFile } from "../middlewares/music.middleware.js";


const router = Router();

router.post("/add", verifyToken, uploadFile, addMusic);
router.get("/getAll", verifyToken, getAllMusics);

export default router;