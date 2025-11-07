app.use(
  "/api/v1/posts",
  auth,
  createProxyMiddleware({
    target: process.env.POST_SERVICE_URL,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      if (req.headers.authorization) {
        proxyReq.setHeader("authorization", req.headers.authorization);
      }
    },
  })
);

app.use(
  "/api/v1/comments",
  auth,
  createProxyMiddleware({
    target: process.env.COMMENT_SERVICE_URL,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      if (req.headers.authorization) {
        proxyReq.setHeader("authorization", req.headers.authorization);
      }
    },
  })
);
