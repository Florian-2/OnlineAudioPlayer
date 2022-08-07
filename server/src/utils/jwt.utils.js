import jwt from "jsonwebtoken";

export const createAccessToken = (userID) => {
    return jwt.sign({ id: userID.toString() }, process.env.JWT_SECRET_KEY, {
        expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRATION)
    });
}

export const clearCookieToken = (res) => {
    res.cookie('accessToken', "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "Lax"
    });
    res.cookie('refreshToken', "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "Lax"
    });
}