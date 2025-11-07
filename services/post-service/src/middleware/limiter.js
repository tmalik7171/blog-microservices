const rateLimit = require("express-rate-limit");

let inflight = 0;
const MAX_INFLIGHT = 100; // bulkhead: concurrent requests cap

function bulkhead(req, res, next) {
  if (inflight >= MAX_INFLIGHT) {
    return res.status(429).json({ message: "Too many concurrent requests" });
  }
  inflight++;
  res.on("finish", () => inflight--);
  res.on("close", () => inflight--);
  next();
}

const rl = rateLimit({
  windowMs: 60 * 1000,
  max: 600,
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { bulkhead, rl };
