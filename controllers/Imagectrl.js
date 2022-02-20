
const Imagemodel =require("../models/Imagemodel")

const Imagectrl = {

uploadImage :async(req,res)=>{

    try {
        const {category,path,likes,comments}=req.body
        const newimage =new Imagemodel({category,path,likes,comments})
        newimage.save()
        res.json({data:"image uploaded"})
        
    } catch (error) {
        res.json({msg:error.message})
    }

},

veiwAllImages : async(req,res)=>{
    


} 



}

modelName.exports =Imagectrl