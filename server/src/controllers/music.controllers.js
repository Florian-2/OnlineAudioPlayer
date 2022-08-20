import { MulterError } from "multer";
import { __dirname } from "../../fs.js";
import { createMusicList } from "../utils/audio.utils.js"
import * as Music from "../services/music.services.js"


export const addMusic = async (req, res) => {
    try {       
        const musics = await createMusicList(req.files);
        const result = await Music.addMusic(musics, req.user._id);

        res.send(result);
    } 
    catch (error) {
        console.log(error);
        res.end();
    }
}