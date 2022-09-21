import Music from "../models/music.model.js";


export const addMusic = async (musics, userID) => {
    try {
        const userMusic = await Music.findOne({ "user_id": userID });

        if (userMusic) {          
            await userMusic.updateOne({ $push: { musics } });
            const music = await Music.aggregate([
                {
                    $addFields: {
                        cleanMusicList: {
                            $reduce: {
                                input: "$musics", // Tableau sur le quel appliquer le reduce
                                initialValue: [], // Valeur initiale (souvent 0)
                                in: { // Représente l'expression qu'on applique sur chaque élément du tableau
                                    $cond: [ // Condition
                                        { $in: ["$$this.title", "$$value.title"] }, // $$value fait référence au 'initialValue' et $$this à la valeur en cours (donc même pricipe que la fonction reduce)
                                        "$$value",
                                        { $concatArrays: ["$$value", ["$$this"]] } // Fusion des tableaux
                                    ]
                                }
                            }
                        }
                    }
                }
            ]);

            await userMusic.updateOne({ $set: { musics: music[0].cleanMusicList }});
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