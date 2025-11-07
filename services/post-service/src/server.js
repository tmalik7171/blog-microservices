const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const pinoHttp = require("pino-http");

const { port, mongoURI } = require("./config");
const logger = require("./logger");
const { register } = require("./metrics");

const correlation = require("./middleware/correlation");
const errorHandler = require("./middleware/errors");

const postRoutes = require("./routes/posts");

const app = express();

// security & basics
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(mongoSanitize());

// observability
app.use(correlation());
app.use(pinoHttp({ logger }));

// versioned routes
app.use("/api/v1/posts", postRoutes);

// metrics endpoint
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// global error handler
app.use(errorHandler);

// startup
mongoose.connect(mongoURI)
  .then(() => {
    logger.info("Post Service DB Connected ✅");
    app.listen(port, () => logger.info(`Post Service running on port ${port}`));
  })
  .catch(err => {
    logger.error({ msg: "Mongo connect error", err: err.message });
    process.exit(1);
  });
