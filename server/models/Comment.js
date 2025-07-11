const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    content: String,
    author: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
