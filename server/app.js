require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")
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
    origin: [`http://localhost:3500`, `https://todo-app-ztr6.onrender.com/`],
    credentials: true,
  })
);
app.use(express.static("../client/dist"))
app.get("/home", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"))
})

//routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use("/refresh", require("./routes/refreshRoutes"));
app.use("/logout", require("./routes/logoutRoutes"));

//error handler middleware
app.use(errorHandler);

module.exports = { app };
