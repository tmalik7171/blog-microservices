const CircuitBreaker = require("opossum");
const { buildHttpClient, withRetry } = require("./httpClient");
const { userServiceUrl } = require("../config");

const { instance } = buildHttpClient(userServiceUrl);

// NOTE: Our User service earlier doesn't have /users/me.
// If it exists, we’ll use it; otherwise we fall back gracefully.
async function fetchMe({ correlationId, authHeader }) {
  return withRetry(() =>
    instance.get("/api/v1/users/me", { meta: { correlationId, authHeader } })
      .then(r => r.data)
  );
}

const breaker = new CircuitBreaker(fetchMe, {
  timeout: 2500, // 2.5s
  errorThresholdPercentage: 50,
  resetTimeout: 5000,
  rollingCountTimeout: 10000,
  rollingCountBuckets: 10
});

breaker.fallback(() => ({ id: "unknown", name: "Unknown User" }));

async function getUserSnapshot(opts) {
  try {
    const data = await breaker.fire(opts);
    return { id: data.userId || data.id || "unknown", name: data.name || "Unknown User" };
  } catch {
    return { id: "unknown", name: "Unknown User" };
  }
}

module.exports = { getUserSnapshot, breaker };