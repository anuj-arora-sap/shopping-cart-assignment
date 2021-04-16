const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json } = format;
// adds transport to winston,saves winston logs in filename.log
const moment = require("moment");
const date = new Date();
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `logs/ShoppingCart-${moment(date).format("YYYY-MM-DD")}.log`
    })
  ]
});

module.exports = logger;
