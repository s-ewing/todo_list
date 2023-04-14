const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
    const payload = { userId };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
    return accessToken;
  };
  
  const generateRefreshToken = (userId) => {
    const payload = { userId };
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
    return refreshToken;
  };

  module.exports = { generateAccessToken, generateRefreshToken }