const rateLimit = require("express-rate-limit");

const rl = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { rl };
