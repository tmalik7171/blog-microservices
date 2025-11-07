const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

module.exports = function auth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = { id: payload.userId, email: payload.email, name: payload.name, role: payload.role || "user" };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
