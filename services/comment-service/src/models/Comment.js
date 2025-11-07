const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true },
    authorId: { type: String, required: true },
    authorName: { type: String, default: "Unknown User" },
    body: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
