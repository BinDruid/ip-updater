import winston from "winston"
import { format } from "logform"
const { combine, timestamp, prettyPrint } = format

const logger: winston.Logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/combined.log",
      level: "info",
    }),
  ],
})

export default logger
