import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const refreshTokenSchema = mongoose.Schema({
    token: String,
    expiryDate: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

refreshTokenSchema.statics.createToken = async function (user) {
    const expiredAt = new Date();
    const time = Number(process.env.REFRESH_TOKEN_EXPIRATION);
    expiredAt.setSeconds(expiredAt.getSeconds() + time);

    console.log(`Le refreshToken expire à ${expiredAt.toLocaleTimeString()}`);

    const _token = uuidv4();
    const _object = new this({
        token: _token,
        user: user._id,
        expiryDate: expiredAt.getTime()
    });
    
    const refreshToken = await _object.save();
    return refreshToken.token;
};

refreshTokenSchema.statics.verifyExpiration = (token) => {
    const tokenExpDate = token.expiryDate.getTime();
    const now = new Date().getTime();

    return tokenExpDate < now;
}

const refreshToken = mongoose.model("refreshTokens", refreshTokenSchema);

export default refreshToken;