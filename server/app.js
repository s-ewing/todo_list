require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

//middleware
app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [`http://127.0.0.1:5173`, `http://localhost:3500`],
    credentials: true,
  })
);

//routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use("/refresh", require("./routes/refreshRoutes"));
app.use("/logout", require("./routes/logoutRoutes"));

//error handler middleware
app.use(errorHandler);

module.exports = { app };
