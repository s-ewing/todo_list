const { logEvent } = require("../utils/log");

const errorHandler = (err, req, res) => {
  //Check for origin
  const origin = req.headers.origin ? req.headers.origin : "";

  //Log error
  if (process.env.NODE_ENV !== "production") {
  logEvent(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.url}\t${origin}`,
    "errorLog.log"
  );
  }
  console.log(err.stack);

  //Send response
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({ message: err.message });

};

module.exports = { errorHandler };
