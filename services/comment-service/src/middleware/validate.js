const { z } = require("zod");

const commentSchema = z.object({
  postId: z.string().min(1),
  body: z.string().min(1).max(5000)
});

module.exports = { commentSchema };
