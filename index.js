const express =require("express")

const app = express()

const mongoose = require("mongoose")

//middleware
app.use(express.json())

require("./routers/UserRouter")(app) //since it is a function

//connecting to mongodb
mongoose.connect("mongodb+srv://JASEELA:JASEELA@cluster0.d42fr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

//if connection is successful
//it is a promise
 .then(()=>
    console.log("database connected")

 )
 .catch((error)=>
    
    console.log(error))


//get method
app.get("/",(req,res)=>
res.send("hello people")
)

const Port =process.env.PORT||9000;
//server listening to port 9000
app.listen(Port,()=>console.log('server is live on port 9000'))
