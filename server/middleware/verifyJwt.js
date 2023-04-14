const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.sendStatus(401);
        return;
    }

    //extract token from auth header
    const token = authHeader.split(" ")[1];

    //verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            res.sendStatus(403); //invalid token
            return;
        }

        //add user id to req object
        req.userId = decodedToken.userId;
        next();
    });
}

module.exports = verifyJwt;