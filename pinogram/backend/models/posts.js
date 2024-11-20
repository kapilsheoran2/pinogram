const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
  CommentText: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  CommentLikes: {
    type: Array,
    default: [],
  },
});


const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;