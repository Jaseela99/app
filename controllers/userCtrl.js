const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        password: bcrypt.hashSync(password, 10),
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
      const token = jwt.sign({ id: user._id }, process.env.API_SECRET, { expiresIn: 86400} );
      return res
        .status(200)
        .json({ data: user, msg: "login successful", accessToken: token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /* //to get data of all registered users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json({ data: users });
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
  // get uder by id
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.json({ msg: "user not found" });
      }
      res.json({ data: user.fullName });
    } catch (error) {
      res.json({ msg: error.message });
    }
  }, */

  /* ///delete user by id
  deleteUserById: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.json({ msg: "user removed" });
    } catch (error) {
      res.json({ msg: error.message });
    }
  }, */
};

module.exports = userCtrl;
