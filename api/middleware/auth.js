const jwt = require("jsonwebtoken")
const jwtSecret = "3hb734h3d8h6t34d6s4h63d4h6384d6j";

function verifyUser(req, res, next) {
    const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if(!userData || err){
        return res.status(400).json({messgae : "Not authorized"});
    }
    req.user = userData;
    next();
  });
}

module.exports = verifyUser;
