const express = require("express");

const app = express();

const mongoose = require("mongoose");

app.use(express.json()); //to set up middleware  and express.json recognize req as json object

require("./routers/UserRouter")(app); //since it is a function
require("./routers/ImageRouter")(app);
//Mongoose is a Node. js-based Object Data Modeling (ODM) library for MongoDB.
//connecting to mongodb
mongoose.connect("mongodb+srv://JASEELA:JASEELA@cluster0.d42fr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

  //if connection is successful
  //it is a promise
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));

//get method
app.get("/", (req, res) => res.send("hello people"));

const Port = process.env.PORT || 8000;
//server listening to port 9000
app.listen(Port, () => console.log(`server is live on port ${Port}`));
