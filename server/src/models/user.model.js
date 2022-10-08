import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Music from "./music.model.js"
import Token from "./token.model.js"


const userSchema = mongoose.Schema({
    username: { 
        type: String, 
        require: [true, "Nom d'utilisateur requis"],
        minLength: [3, "3 caractères minimum"]
    },
    email: { 
        type: String, 
        require: [true, "Adresse email requise"],
        lowercase: true,
        trim: true,
        unique: [true, "L'adresse mail est déjà utilisé"],
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Le format de l'adresse mail est invalide"]
    },
    password: {
        type: String,
        required: [true, "Mot de passe requis"],
        minLength: [8, "Le mot de passe doit contenir aux moins 8 caractères"]
    }
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    const user = this;

    try {       
        if (!user.isModified('password')) 
            return next();

        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;
        next();
    } 
    catch (error) {
        next(error);
    }
})

userSchema.pre('deleteOne', async function (next) {
    const userDoc = await this.model.findOne(this.getQuery());

    try {       
        await Music.deleteOne({ "user_id": userDoc._id });
        await Token.deleteOne({ "user_id": userDoc._id });
        next();
    } 
    catch (error) {
        next(error);
    }
})

userSchema.methods.deleteProp = function(...prop) {
    const user = this.toObject();

    for (const key in user) {
        if (prop.includes(key)) {
            delete user[key];
        }
    }

    return user;
}

const UserModel = mongoose.model("users", userSchema);

export default UserModel;