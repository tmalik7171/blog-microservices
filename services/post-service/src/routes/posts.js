const express = require("express");
const auth = require("../middleware/auth");
const { bulkhead, rl } = require("../middleware/limiter");
const { validateBody, postCreateSchema, postUpdateSchema } = require("../middleware/validate");
const {
  createPost, listPosts, getPost, updatePost, deletePost, health
} = require("../controllers/postController");

const router = express.Router();

// health & metrics-free path
router.get("/health", health);

// public reads
router.get("/", rl, bulkhead, listPosts);
router.get("/:id", rl, bulkhead, getPost);

// protected writes
router.post("/", rl, bulkhead, auth, validateBody(postCreateSchema), createPost);
router.patch("/:id", rl, bulkhead, auth, validateBody(postUpdateSchema), updatePost);
router.delete("/:id", rl, bulkhead, auth, deletePost);

module.exports = router;
