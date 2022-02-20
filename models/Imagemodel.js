const mongoose =require("mongoose")

const ImageSchema = new mongoose.Schema(
    {
     category:{
         type:String
     },
     path:{
         type:String
     },
     likes:{
         type:Number,
         default:0
     },
     comments:{
         type:String
     }
    })
    const ImageModel = mongoose.model("Images",ImageSchema)
    module.exports =ImageModel