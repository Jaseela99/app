const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { fullName, email, password } = req.body; //{"fullName" :"fullName"}

      //  {
      // "fullName":"Jaseela A",
      // "email" :"jaseela@gamil.com",
      // "password":"Jaseela"

      //   }

      //while registering we need to verify the email id is unique,passwordlength
      const user = await User.findOne({ email });

      if (user) {
        return res.status(404).json({ msg: "user already exists" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "password must contain atleast 6 characters" });
      }

      const newUser = new User({
        fullName,
        email,
        password: bcrypt.hashSync(password, 10),//bcrypt to hash our password before storing it in the database.
        //used to Synchronously generates a hash for the given string
      });
      await newUser.save();
      return res.status(200).json({ msg: "registration successful" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "user not found" });
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ msg: "Invalid password" });
      }
     //to add token signature

      const token = jwt.sign({ id: user._id },"this_is_secret", {
        expiresIn: 86400,
      });
      return res
        .status(200)
        .json({ data: user, msg: "login successful", accessToken: token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
