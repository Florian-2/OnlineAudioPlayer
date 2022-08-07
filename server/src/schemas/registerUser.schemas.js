import { checkSchema } from "express-validator";
import User from "../models/user.model.js";


export const userSignupSchema = checkSchema({
    username: {
        trim: true,
        isLength: {
            options: { min: 3 },
            errorMessage: "3 caractères minimums"
        }
    },
    email: {
        trim: true,
        toLowerCase: true,
        isEmail: {
            errorMessage: "Le format de l'adresse mail est invalide",
            bail: true
        },
        custom: {
            options: async (email) => {
                const user = await User.find({ email }).exec();

                if (user.length > 0) {
                    return Promise.reject(false);
                }
                else {
                    return Promise.resolve(true);
                }
            },
            errorMessage: "Adresse mail déjà utilisée"
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: "Mot de passe requis",
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "Le mot de passe doit contenir aux moins 8 caractères"
        }
    }
})

export const userLoginSchema = checkSchema({
    email: {
        trim: true,
        toLowerCase: true,
        isEmail: {
            errorMessage: "Le format de l'adresse mail est invalide",
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Mot de passe requis",
        }
    }
})