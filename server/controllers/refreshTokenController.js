const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/token.js");

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;

  //check for refresh token in cookies
  if (!cookies?.refresh_token) {
    res.sendStatus(401);
    return;
  }

  const refreshToken = cookies.refresh_token;

  try {
    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) {
      res.sendStatus(403);
      return;
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decodedToken) => {
        if (err || foundUser._id.toString() !== decodedToken.userId) {
          res.sendStatus(403);
          return;
        }
        const accessToken = generateAccessToken(decodedToken.userId);
        res.status(200).json({ accessToken });
      }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = { handleRefreshToken };
