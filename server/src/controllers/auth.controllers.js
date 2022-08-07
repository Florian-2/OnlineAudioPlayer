import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail, findUserById } from "../services/user.services.js";
import refreshTokenModel from "../models/token.model.js"
import { createAccessToken, clearCookieToken } from "../utils/jwt.utils.js"


export const signup = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.send(user);
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Une erreur est survenue lors de l'inscription" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await findUserByEmail(email);

        // Vérification du mot de passe
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(400).json({ message: "Adresse mail ou mot de passe incorrect" });
        }

        // Access Token et Refresh Token
        const token = createAccessToken(user._id);
        const refreshToken = await refreshTokenModel.createToken(user);

        res.cookie('accessToken', token, {
            httpOnly: true,
            sameSite: "Lax"
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: "Lax"
        });

        user = user.deleteProp("password", "__v");
        res.json(user);
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Adresse mail ou mot de passe incorrect" });
    }
}

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(403).json({ message: "Refresh token requis" });
    }

    try {
        const myRefreshToken = await refreshTokenModel.findOne({ refreshToken }).exec();

        if (!myRefreshToken) {
            return res.status(403).json({ message: "Refresh token n'est pas dans la DB" });
        }

        // Si cette fonction retourne "true" alors le refreshToken a expiré
        if (refreshTokenModel.verifyExpiration(myRefreshToken)) {
            await refreshTokenModel.findByIdAndRemove(myRefreshToken._id, { useFindAndModify: false }).exec();
            clearCookieToken(res);

            return res.status(401).send({ message: "Votre session a expiré, veuillez vous reconnecter" });
        }

        const newAccessToken = jwt.sign({ id: myRefreshToken.user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRATION)
        });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            sameSite: "Lax"
        });

        const user = await findUserById(myRefreshToken.user._id);
        res.send(user);
    } 
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const logout = async (req, res) => {
    try {
        await refreshTokenModel.findOneAndDelete({ token: req.cookies.refreshToken }, { useFindAndModify: false }).exec();

        clearCookieToken(res);
        res.end();
    } 
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}