import pino from "pino";
import { v4 as uuidv4 } from "uuid";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname"
    }
  }
});

export const logRequest = (req, res, next) => {
  req.id = uuidv4();
  logger.info({ id: req.id, method: req.method, url: req.url });
  next();
};

export default logger;
