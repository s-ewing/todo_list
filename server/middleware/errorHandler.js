const { logEvent } = require("../utils/log");

const errorHandler = (err, req, res, next) => {
  //Check for origin
  const origin = req.headers.origin ? req.headers.origin : "";

  //Log error
  logEvent(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.url}\t${origin}`,
    "errorLog"
  );
  console.log(err.stack);

  //Send response
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({ message: err.message });

};

module.exports = { errorHandler };
