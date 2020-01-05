const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    min: 6,
    max: 255,
    required: true
  },
  password: {
    type: String,
    min: 6,
    max: 255,
    required: true
  }
});

const user = mongoose.model("User", userSchema);
module.exports = user;
