require("dotenv").config(); //this loads variables in .env to process.env

const mongoose = require("mongoose"); //bring in mongoose

const app = require("./app"); //bring in app.js

const port = 3000; //the port variable

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) //connect the database, insert MONGO-DB variable from .env, the next two things are options that we specify to stop getting terminal messages.
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected on ${port}`);
      console.log("MongoDB Connected");
    }); //if we connect then send us a success message!
  })
  .catch((e) => {
    console.log(e);
  }); //if we get an error message then send us an error message.
