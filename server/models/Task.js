const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "incomplete",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
