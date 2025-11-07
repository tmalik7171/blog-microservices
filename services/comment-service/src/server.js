require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const pinoHttp = require("pino-http");
const { rl } = require("./middleware/limiter");
const errorHandler = require("./utils/errorHandler");
const { connectDB } = require("./config");
const commentRoutes = require("./routes/comments");

const app = express();
const PORT = process.env.PORT || 4003;

connectDB();

app.use(pinoHttp());
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "100kb" }));
app.use(mongoSanitize());
app.use(rl);

// Versioned API
app.use("/api/v1/comments", commentRoutes);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Comment Service running on port ${PORT}`));
