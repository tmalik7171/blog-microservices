const { z } = require("zod");

exports.validateBody = (schema) => (req, res, next) => {
  const r = schema.safeParse(req.body);
  if (!r.success) {
    return res.status(400).json({ message: "Validation error", issues: r.error.issues });
  }
  req.body = r.data;
  next();
};

exports.postCreateSchema = z.object({
  title: z.string().min(1).max(150),
  body: z.string().min(1).max(10000)
});

exports.postUpdateSchema = z.object({
  title: z.string().min(1).max(150).optional(),
  body: z.string().min(1).max(10000).optional()
}).refine(d => d.title || d.body, { message: "Provide title or body" });
