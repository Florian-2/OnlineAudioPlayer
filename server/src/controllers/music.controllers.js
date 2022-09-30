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
        res.status(500).json({ message: "Erreur serveur." });
    }
}

export const getAllMusics = async (req, res) => {
    try {
        const musics = await Music.getAllMusics(req.user._id);
        res.json({ musics: musics[0].musics, _id: musics[0]._id });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Vous n'avez pas encore importé vos musiques." });
    }
}

export const getOneMusic = async (req, res) => {
    try {
        const music = await Music.getOneMusic(req.user._id, req.params.id);
        res.json(music.musics[0]);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const editOneMusic = async (req, res) => {
    try {
        const musicID = req.params.id;
        await Music.editOneMusic(musicID, req.body);
        const music = await Music.getOneMusic(req.user._id, musicID);
        res.json(music);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const likeOrDislike = async (req, res) => {
    try {
        const musidId = req.params.id;
        const newValue = req.body.fav;
        const response = await Music.likeOrDislike(musidId, newValue);
        res.json({ result: response });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

export const deleteMusic = async (req, res) => {
    try {
        const musidId = req.params.id;
        const response = await Music.deleteMusic(req.user._id, musidId);
        res.json({ result: response });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}