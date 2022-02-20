const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
 fullName :{
     type:String,
     required:true
 },
 email:{
     type:String,
     lowercase:true,
     required:true,
     unique:true
 },
 password :{
     type:String,
     required:true,
     minLength:6
 }

})

//creating user model

const userModel =mongoose.model("User",userSchema)

module.exports =userModel