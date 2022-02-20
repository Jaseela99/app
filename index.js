const express =require("express")

const app = express()

const mongoose = require("mongoose")

//connecting to mongodb
try{
    
    mongoose.connect("mongodb+srv://JASEELA:JASEELA@cluster0.d42fr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    //if conne tion is successful
    console.log("database connected")

}catch(error){
    
    console.log(error)
}


const Port =process.env.PORT||9000;
//server listening to port 9000
app.listen(Port,()=>console.log('server is live on port 9000'))
