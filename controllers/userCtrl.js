const User = require("../models/Usermodel");

const userCtrl = {
  register: async (req, res) => {
        try {
          const { fullName, email, password } = req.body;

          //  {
          // "fullName":"Jaseela A",
          // "email" :"jaseela@gamil.com",
          // "password":"Jaseela"

          //   }

         //while registering we need to verify the email id is unique,passwordlength
           const user = await User.findOne({ email });

          if (user) {
           res.json({ msg: "user already exists" });
          }
          if (password.length < 6) {
            res.json({ msg: "password must contain atleast 6 characters" });
          }

          const newUser = new User({ fullName, email, password });
          await newUser.save();
         res.json({ msg: "registration successful" });
        } catch (error) {
         res.json({ msg: error.message });
        }
    },

  getAllUsers: async(req,res)=>{
    try{
      const users = await User.find()
      res.json({data:users})

    }catch(error){
     res.json({msg:error.message})
    }
  }
  
};


module.exports =userCtrl