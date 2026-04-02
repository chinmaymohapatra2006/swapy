const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  //  NEW FIELDS
  skillsOffered: [String],
  skillsWanted: [String],
  
  // SEED FIELDS
  role: String,
  rating: Number,
  match: String,
  avatar: String,
});

module.exports = mongoose.model("User", userSchema);