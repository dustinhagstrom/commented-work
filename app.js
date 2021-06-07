const express = require("express"); //bring in express
const logger = require("morgan"); // bring in morgan

const app = express(); //calling express to use for req

const userRouter = require("./routes/user/userRouter");
//brings in the userRouter
app.use(logger("dev")); //this tells morgan to logger req with a development format. there are four options: default, short, tiny, and dev.

app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));
//this uses a built in method that basically parses the incoming req object into strings or arrays. extended false uses the library querystring. true uses qs.
app.use("/api/user", userRouter);
//this is saying that a url req with the api/user will use the userRouter file
module.exports = app;
//export the invocation of express for use in other files.
