const logger = require("../logger");

module.exports = function errorHandler(err, req, res, _next) {
  logger.error({
    msg: "Unhandled error",
    err: err.message,
    stack: err.stack,
    correlationId: req.correlationId
  });
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
};
