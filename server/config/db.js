const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  if (process.env.NODE_ENV !== "production") {
    const mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    try {
      await mongoose.connect(uri);
      console.log("Connected to in-memory MongoDB");
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
      console.error(err);
    }
  }
};

const disconnectDB = () => {
  mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB }
