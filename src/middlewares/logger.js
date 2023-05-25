const winston = require("winston");
const config = require("../config/config");

const customOptions = {
  levels: { fatal: 0, error: 1, warning: 2, info: 3, http: 4, debug: 5 },
  colors: {
    fatal: "red",
    error: "violet",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

const developLogger = winston.createLogger({
  levels: customOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

const addLogger = (req, res, next) => {
  req.logger = config.enviroment === "DEVELOPMENT" ? developLogger : prodLogger;
  //   req.logger.info(
  //     `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  //   );
  next();
};

module.exports = addLogger;
