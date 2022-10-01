import * as User from "../services/user.services.js";


export const profile = async (req, res) => {
    try {
        console.log("user", req.user);
        res.send(req.user);
    } 
    catch (error) {
        console.log(error);
    }
}

export const editProfile = async (req, res) => {
    try {
        const user = await User.updateProfile(req.user._id, req.body);
        res.json(user);
    } 
    catch (error) {
        console.log(error);
    }
}