const { logEvent } = require("../utils/log");

const logger = (req, res, next) => {
  //Check for origin
  const origin = req.header.origin ? req.header.origin : "";

  //Log event
  if (process.env.NODE_ENV !== "production") {
    logEvent(`${req.method}\t${req.url}\t${origin}`, "reqLog.log");
  }
  console.log(`${req.method} ${req.path}`);

  next();
};

module.exports = { logger };
