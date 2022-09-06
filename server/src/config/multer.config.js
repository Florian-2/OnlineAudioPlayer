import multer from "multer";
import { __dirname } from "../../fs.js"
import path from "path";

const mimeTypeAudio = ["audio/mpeg", "audio/mp4", "audio/flac", "audio/x-wav", "audio/ogg", "audio/basic"];

const storage = multer.diskStorage({
    destination (req, file, cb) 
    {
        if (mimeTypeAudio.includes(file.mimetype)) {
            cb(null, path.join(__dirname, "src", "public", "upload", "music"));
        }
        else {
            cb(null, path.join(__dirname, "src", "public", "upload", "thumbnail"));
        }
    },
    filename (req, file, cb) {
        const cleanFileName = file.originalname;
        cb(null, `${Date.now()}-${cleanFileName}`);
    }
});

export const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 36_700_160, // 35MO
        fields: 0
    }, 
    fileFilter (req, file, cb) {
        if (!mimeTypeAudio.includes(file.mimetype)) {
            return cb(new Error("Seules les formats MP3/MP4/FLAC/WAV/OGG/BASIC sont autorisés"));
        } 
        else {
            cb(null, true);
        }
    }
});