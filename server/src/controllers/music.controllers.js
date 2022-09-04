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

export const getAllMusics = async (req, res) => {
    try {
        const musics = await Music.getAllMusics(req.user._id);
        res.json({ musics: musics[0].musics, _id: musics[0]._id });
    } 
    catch (error) {
        console.log(error);
        res.end();
    }
}