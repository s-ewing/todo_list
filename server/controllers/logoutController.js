const User = require("../models/User");

const handleLogout = async (req, res, next) => {
  //make sure to delete access token on client!
  const cookies = req.cookies;

  if (!cookies?.refresh_token) {
    res.sendStatus(204);
    return;
  }

  const refreshToken = cookies.refresh_token;

  try {
    //find user
    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) {
      res.clearCookie("refresh_token", { httpOnly: true });
      res.sendStatus(204);
      return;
    }

    //set user refresh token to null
    foundUser.refreshToken = null;
    await foundUser.save();
    res.clearCookie("refresh_token", { httpOnly: true });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = { handleLogout };
