const express = require("express");

const app = express();

const mongoose = require("mongoose");

//process.env has the the keys and values entered in .env

require("dotenv").config();

app.use(express.json());

require("./routers/UserRouter")(app); //since it is a function
require("./routers/ImageRouter")(app);

//connecting to mongodb
mongoose
  .connect(process.env.CONNECTION)

  //if connection is successful
  //it is a promise
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));

//get method
app.get("/", (req, res) => res.send("hello people"));

const Port = process.env.PORT || 8000;
//server listening to port 9000
app.listen(Port, () => console.log(`server is live on port ${Port}`));
