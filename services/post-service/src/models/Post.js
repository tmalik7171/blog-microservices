const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    authorId: { type: String, required: true },
    authorName: { type: String }, // denormalized snapshot
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
