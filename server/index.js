const mongoose = require("mongoose");
const connectDB = require("./config/db");
const { app } = require("./app");
const PORT = process.env.PORT || 3500;

//connect to db
connectDB();

//start app upon succesful db connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

//log error if connection to db fails
mongoose.connection.on("error", (err) => {
  console.log(err);
});
