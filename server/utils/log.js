const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvent = async (message, logFileName) => {
  const date = format(new Date(), "yyyMMdd\tHH:mm:ss");
  const logItem = `${date}\t${uuid()}\t${message}\n`;

  try {
    //Check if logs directory exists and create it necessary
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    //Add log item to log file
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { logEvent };
