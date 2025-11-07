const Post = require("../models/Post");
const { httpDuration } = require("../metrics");
const logger = require("../logger");
const { getUserSnapshot } = require("../services/userClient");

// Create
exports.createPost = async (req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method, route: "/api/v1/posts", status_code: "pending" });
  try {
    // Optional enrichment via User service (graceful on failure)
    const snapshot = await getUserSnapshot({
      correlationId: req.correlationId,
      authHeader: req.headers.authorization
    });

    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      authorId: req.user.id,
      authorName: snapshot.name || req.user.name
    });

    res.status(201).json(post);
    end({ status_code: 201 });
  } catch (e) {
    end({ status_code: 500 });
    next(e);
  }
};

// List
exports.listPosts = async (req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method, route: "/api/v1/posts", status_code: "pending" });
  try {
    const page  = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const sort  = req.query.sort || "-createdAt";
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Post.find().sort(sort).skip(skip).limit(limit),
      Post.countDocuments()
    ]);

    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
    end({ status_code: 200 });
  } catch (e) {
    end({ status_code: 500 });
    next(e);
  }
};

// Get
exports.getPost = async (req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method, route: "/api/v1/posts/:id", status_code: "pending" });
  try {
    const post = await Post.findById(req.params.id);
    if (!post) { end({ status_code: 404 }); return res.status(404).json({ message: "Post not found" }); }
    res.json(post);
    end({ status_code: 200 });
  } catch (e) {
    end({ status_code: 500 });
    next(e);
  }
};

// Update (owner only)
exports.updatePost = async (req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method, route: "/api/v1/posts/:id", status_code: "pending" });
  try {
    const post = await Post.findById(req.params.id);
    if (!post) { end({ status_code: 404 }); return res.status(404).json({ message: "Post not found" }); }
    if (post.authorId !== req.user.id) { end({ status_code: 403 }); return res.status(403).json({ message: "Forbidden" }); }

    if (req.body.title) post.title = req.body.title;
    if (req.body.body)  post.body  = req.body.body;
    await post.save();

    res.json(post);
    end({ status_code: 200 });
  } catch (e) {
    end({ status_code: 500 });
    next(e);
  }
};

// Delete (owner only)
exports.deletePost = async (req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method, route: "/api/v1/posts/:id", status_code: "pending" });
  try {
    const post = await Post.findById(req.params.id);
    if (!post) { end({ status_code: 404 }); return res.status(404).json({ message: "Post not found" }); }
    if (post.authorId !== req.user.id) { end({ status_code: 403 }); return res.status(403).json({ message: "Forbidden" }); }

    await post.deleteOne();
    res.status(204).send();
    end({ status_code: 204 });
  } catch (e) {
    end({ status_code: 500 });
    next(e);
  }
};

// Health
exports.health = async (_req, res) => {
  res.json({ status: "ok", service: "post-service", time: new Date().toISOString() });
};
