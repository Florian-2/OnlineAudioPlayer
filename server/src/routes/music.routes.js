import { Router } from "express";
import { addMusic, getAllMusics, likeOrDislike } from "../controllers/music.controllers.js";
import { verifyToken } from "../middlewares/authJwt.js";
import { uploadFile } from "../middlewares/music.middleware.js";


const router = Router();

router.post("/add", verifyToken, uploadFile, addMusic);
router.get("/getAll", verifyToken, getAllMusics);
router.put("/add-to-favorite/:id", verifyToken, likeOrDislike);

export default router;