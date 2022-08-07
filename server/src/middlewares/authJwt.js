import jwt from "jsonwebtoken";
import { findUserById } from "../services/user.services.js";


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.sendStatus(403);
    }

    try {
        let decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await findUserById(decodeToken.id);
        req.user = user;

        next();
    }     
    catch (error) {
        // console.log(error);

        // Refresh Token
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send({ reason: "token expired", message: "Votre session a expiré, veuillez vous reconnecter" });
        }

        res.sendStatus(403);
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const id = req.user._id;
        const user = await findUserById(id);

        if (!user.admin) {
            return res.sendStatus(403);
        }

        next();
    } 
    catch (error) {
        console.log(error);
    }
}