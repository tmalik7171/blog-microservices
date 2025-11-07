const router = require("express").Router();
const { addComment, getCommentsByPost, deleteComment } = require("../controllers/commentController");
const auth = require("../middleware/auth");

// Health check
router.get("/health", (_req, res) => res.json({ status: "ok", service: "comment-service" }));

// List comments for a post (public)
router.get("/post/:postId", getCommentsByPost);

// Add comment (auth)
router.post("/", auth, addComment);

// Delete own comment (auth)
router.delete("/:id", auth, deleteComment);

module.exports = router;
