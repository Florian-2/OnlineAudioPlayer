import Music from "../models/music.model.js";


export const addMusic = async (musics, userID) => {
    try {
        const user = await Music.findOne({ "user_id": userID });

        if (user) {
            await user.updateOne({ $push: { musics } });
            return await Music.findOne({ "user_id": userID });
        }

        return await Music.create({ musics, user_id: userID });
    } 
    catch (error) {
        throw error;
    }
}

export const getAllMusics = async (userID) => {
    try {
        const musics = await Music.find({ "user_id": userID });

        if (musics.length === 0) {
            throw new Error("Vous n'avez pas de musiques");
        }

        return musics;
    } 
    catch (error) {
        throw error;
    }
}