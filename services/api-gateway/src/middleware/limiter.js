import rateLimit from "express-rate-limit";

export const rl = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 600, // max requests per minute
  message: "Too many requests, please try again later.",
});
