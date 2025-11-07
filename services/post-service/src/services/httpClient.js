const axios = require("axios");

// Tiny retry/backoff wrapper
async function withRetry(fn, retries = 2, baseDelayMs = 200) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries) throw err;
      const delay = baseDelayMs * Math.pow(2, attempt); // exponential
      await new Promise(r => setTimeout(r, delay));
      attempt++;
    }
  }
}

function buildHttpClient(baseURL) {
  const instance = axios.create({
    baseURL,
    timeout: 3000 // 3s timeout
  });

  // Propagate correlation-id & user headers
  instance.interceptors.request.use((config) => {
    if (!config.headers) config.headers = {};
    if (config.meta?.correlationId) {
      config.headers["X-Correlation-Id"] = config.meta.correlationId;
    }
    if (config.meta?.authHeader) {
      config.headers["Authorization"] = config.meta.authHeader;
    }
    return config;
  });

  return { instance, withRetry };
}

module.exports = { buildHttpClient, withRetry };
