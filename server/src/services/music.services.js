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