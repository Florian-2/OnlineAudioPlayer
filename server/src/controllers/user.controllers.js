export const profil = async (req, res, next) => {
    try {
        res.send(req.user);
    } 
    catch (error) {
        console.log(error);
    }
}