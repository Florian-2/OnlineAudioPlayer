export const profil = async (req, res) => {
    try {
        console.log("user", req.user);
        res.send(req.user);
    } 
    catch (error) {
        console.log(error);
    }
}