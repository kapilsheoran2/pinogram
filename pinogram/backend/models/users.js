const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: {
    type: String,
    default:
      "https://imgs.search.brave.com/NNqmLl--yA-qoIMCty9nsvqWhEA4yWud-oEGnbBAwbg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzAzLzQ0LzUz/LzM2MF9GXzUwMzQ0/NTM4N19DbVNtZXB3/MmFXZlZjbFZEVGNK/SHFMNjYyZUF3d1Rh/by5qcGc",
  },
  bg: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1627213742863-46b836499634?q=80&w=2889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
  },
  followers: [
    { type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
