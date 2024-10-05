const express = require("express"); //import express
const app = express(); //instantiate express
const path = require("path"); //if i need path
// const fs = require("node:fs");
// const fsPromises = require("node:fs").promises;

const { logger, removeLog } = require("./middleware/logEvents"); //curly braces bc there's multiple fxns being exported
const port = 3300; //create port

//built in middleware for json
app.use(express.json());
// IF I NEED MIDDLEWARE, APP.USE HERE
// Custom Middleware
// Logger - written in logEvents
app.use(logger);

// BUILT IN MIDDLEWARE

// STATIC FILE HANDLING
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/log", (req, res) => {
	res.sendFile(path.join(__dirname, "logs", "reqLog.txt"));
});

// create an API that when we click it will 'fetch' an endpoint, not refresh the page (prevent default), and that triggers a log?
app.post("/log", (req, res) => {
	const { msg } = req.body;
	console.log(msg);
	res.send(console.log("Received"));
});

setInterval(removeLog, 120000, "reqLog.txt"); //removes logs in 120,000ms or 2 min
//on an interval, send logs back to user -- will have to check if we're getting anything -- save to a text file? a json?

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
