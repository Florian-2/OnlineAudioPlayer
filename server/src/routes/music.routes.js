import { Router } from "express";
import { addMusic, getAllMusics, likeOrDislike, deleteMusic, getOneMusic, editOneMusic } from "../controllers/music.controllers.js";
import { verifyToken } from "../middlewares/authJwt.js";
import { uploadFile } from "../middlewares/music.middleware.js";


const router = Router();

router.post("/add", verifyToken, uploadFile, addMusic);
router.get("/getAll", verifyToken, getAllMusics);
router.get("/:id", verifyToken, getOneMusic);
router.put("/add-to-favorite/:id", verifyToken, likeOrDislike);
router.put("/edit/:id", verifyToken, editOneMusic);
router.delete("/delete/:id", verifyToken, deleteMusic);

export default router;