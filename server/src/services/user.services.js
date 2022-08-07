import User from "../models/user.model.js";

export const createUser = async (body) => {
    try {
        const { username, email, password } = body;
        let user = await User.create({ username, email, password });
        user = user.deleteProp("password", "__v");

        return user;
    }
    catch (error) {
        throw error;
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email }).select("-__v").exec();

        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        return user;
    }
    catch (error) {
        throw error;
    }
}

export const findUserById = async (id) => {
    try {
        const user = await User.findById(id).select("-password -__v").exec();

        if (!user) {
            throw new Error("Utilisateur introuvable");
        }

        return user;
    }
    catch (error) {
        throw error;
    }
}