require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4002,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  userServiceUrl: process.env.USER_SERVICE_URL || "http://localhost:4001",
  nodeEnv: process.env.NODE_ENV || "development"
};
