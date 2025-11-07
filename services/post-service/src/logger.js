const pino = require("pino");
const { nodeEnv } = require("./config");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: nodeEnv === "development" ? { target: "pino-pretty" } : undefined,
  base: null
});

module.exports = logger;
