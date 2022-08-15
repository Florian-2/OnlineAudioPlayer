import multer from "multer";
import { __dirname } from "../../fs.js"
import path from "path";

const mimeTypeAudio = ["audio/mpeg", "audio/mp4", "audio/flac", "audio/x-wav", "audio/ogg", "audio/basic"];
const mimeTypeImg = ["image/jpeg", "image/jpg", "image/png"];

export const upload = multer({
    storage: multer.diskStorage({
        destination (req, file, cb) 
        {
            if (mimeTypeAudio.includes(file.mimetype)) {
                cb(null, path.join(__dirname, "src", "public", "upload", "music"));
            }
            else {
                cb(null, path.join(__dirname, "src", "public", "upload", "thumbnail"));
            }
        },
        limits: { 
            fileSize: 20_971_520, // 20MO
            fields: 0
        }, 
        filename (req, file, cb) {
            const cleanFileName = file.originalname.replaceAll(" ", "-");
            cb(null, `${Date.now()}-${cleanFileName}`);
        },
        fileFilter (req, file, cb) {
            const allMimeType = [mimeTypeAudio, mimeTypeImg];

            if (!allMimeType.includes(file.mimetype)) {
                return cb(new Error(`
                    Pour les musiques seules les formats MP3/MP4/FLAC/WAV/OGG/BASIC sont autorisés.\n
                    Pour les images seuls les format: PNG/JPG sont autorisés.`
                ));
            } 
            else {
                cb(null, true);
            }
        }
    })
});