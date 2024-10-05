//IMPORTS
//npm modules
const { format } = require("date-fns");

//node modules
const fs = require("node:fs");
const fsPromises = require("node:fs").promises;
const path = require("node:path");

// why don't we write this as function logEvents()
// we could accept another parameter
const logEvents = async (message, logName) => {
	const dateTime = `${format(new Date(), "yyyMMdd\tHH:mm:ss")}`;
	const logItem = `${dateTime}\t${message}\n`;
	try {
		//if the path exists -- existsSync sees if the path exists
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "..", "logs")); //make a dir
		}
		await fsPromises.appendFile(
			path.join(__dirname, "..", "logs", logName),
			logItem
		);
	} catch (err) {
		console.log(err);
	}
};

const clearLog = (logName) => {
	if (fs.existsSync(path.join(__dirname, "..", "logs", logName))) {
		fsPromises.writeFile(path.join(__dirname, "..", "logs", logName), "");
	}
};

// Custom Middleware
// we need next bc we're building this
// this will be used when we call a fetch api from the front end to....some page....that will handle this? this is where i'm a little confused -- I had written this for a different class. OR! Or, when it calls the fetch api, it willreturn a message if red or a message if blue, yes!
const logger = (req, res, next) => {
	if (req.url === "/log") {
		logEvents(
			`${req.method}\t${req.headers.origin}\t${req.url}\t${req.body.message}`,
			"reqLog.txt"
		);
	}
	// console.log(`${req.method} ${req.body}`);
	next();
};

// export our logEvents fxn
module.exports = { logEvents, logger, clearLog };
