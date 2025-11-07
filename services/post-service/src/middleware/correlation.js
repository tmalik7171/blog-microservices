const { v4: uuid } = require("uuid");

module.exports = function correlation() {
  return (req, res, next) => {
    const incoming = req.headers["x-correlation-id"];
    const id = incoming && String(incoming).trim() ? incoming : uuid();
    req.correlationId = id;
    res.setHeader("X-Correlation-Id", id);
    next();
  };
};
