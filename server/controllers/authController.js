const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const createNewUser = async (req, res, next) => {
  const { email, password } = req.body;

  //Confirm data
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    //Check for duplicate email
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
      res
        .status(409)
        .json({ message: "An account with that email already exists" });
    }

    //Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPwd };

    //Create and store user
    const user = await User.create(newUser);

    //Send response based on success/failure of user creation
    if (user) {
      res.status(201).json({ message: "New account created" });
    } 
  } catch (err) {
    next(err);
  }
};

const handleLogin = async (req, res, next)  => {
  const { email, password } = req.body;

  //Confirm data
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    //Find User
    const user = await User.findOne({ email }).exec();

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    //Validate password
    const validPwd = await bcrypt.compare(password, user.password);

    if (!validPwd) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    //Generate access and refresh tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    //Store refresh token in db
    user.refreshToken = refreshToken;
    await user.save();

    //Send refresh token as cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRATION) * 1000 * 60 * 60, //convert ms to hr
    });

    //Send success response and accessToken
    res.status(200).json({ accessToken });

  } catch (err) {
    next(err);
  }
};

module.exports = { createNewUser, handleLogin };
