const Comment = require("../models/Comment");
const { commentSchema } = require("../middleware/validate");
const { verifyPostExists } = require("../services/postClient");

exports.addComment = async (req, res) => {
  const parsed = commentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });
  const { postId, body } = parsed.data;

  const exists = await verifyPostExists(postId);
  if (!exists) return res.status(404).json({ message: "Post not found" });

  const comment = await Comment.create({
    postId,
    authorId: req.user.userId,
    authorName: req.user.name || "Unknown User",
    body
  });

  res.status(201).json(comment);
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const items = await Comment.find({ postId }).sort("-createdAt");
  res.json({ items, total: items.length });
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const c = await Comment.findById(id);
  if (!c) return res.status(404).json({ message: "Comment not found" });
  if (String(c.authorId) !== String(req.user.userId)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await c.deleteOne();
  res.status(204).send();
};
