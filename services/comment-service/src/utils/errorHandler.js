module.exports = function errorHandler(err, req, res, _next) {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
};
