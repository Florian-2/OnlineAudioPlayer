import { MulterError } from "multer";
import { upload } from "../config/multer.config.js";


export const uploadFile = (req, res, next) => {
    const uploadFile = upload.array("musics");

    uploadFile(req, res, (err) => {
        if (err instanceof MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'Fichier trop volumineux, la taille est limitée à 20Mo par fichier.' });
            }
        } 
        else if (err) {
            next(e);
        }

        next();
    });
}