const { logEvent } = require("../utils/log");

const logger = (req, res, next) => {
  //Check for origin
  const origin = req.header.origin ? req.header.origin : '';
  
  //Log event
  logEvent(`${req.method}\t${req.url}\t${origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);

  next();
};

module.exports = { logger };
