import mongoose from "mongoose";

const musicSchema = mongoose.Schema({
    musics: [
        {
            title: {
                type: String,
                require: false,
            },
            artist: {
                type: Array,
                require: false
            },
            artists: {
                type: Array,
                require: false
            },
            album: {
                type: String,
                require: false
            },
            albumartist: {
                type: String,
                require: false
            },
            genre: {
                type: Array,
                require: false
            },
            composer: {
                type: Array,
                require: false
            },
            size: {
                type: Number,
                require: false
            },
            lyrics: {
                type: Array,
                require: false
            },
            urlMusic: {
                type: String,
                require: false
            },
            thumbnail: {
                type: String,
                require: false
            }
        }
    ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

const MusicModel = mongoose.model("musics", musicSchema);

export default MusicModel;