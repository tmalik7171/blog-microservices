const client = require("prom-client");

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"]
});

register.registerMetric(httpDuration);

module.exports = { register, httpDuration };
