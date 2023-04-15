const { logEvent } = require("../utils/log");

const logger = (req, res, next) => {
  const origin = req.header.origin ? req.header.origin : '';
  logEvent(`${req.method}\t${req.url}\t${origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger };
