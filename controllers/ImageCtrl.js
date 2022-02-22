const imageModel = require("../models/ImageModel");
const userModel = require("../models/UserModel");
const commentModel = require("../models/commentmodel");

const imageControl = {

  //uploading an image

  uploadImage: async (req, res) => {
    try {
      const { category, path } = req.body;

      if (!path) {
        return res.status(400).json({ msg: "please provide the path" });
      }

      const newimage = new imageModel({ category, path,user:req.userId });
      await userModel.findByIdAndUpdate(req.userId, {
        $push: { posts: newimage.id }, //to push userid to likes
        $inc: { postCount: 1 }, //to increase the post count by 1
      });
      await newimage.save();

      return res.status(200).json({ msg: "image uploaded" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  //to get all images

  getAllImages: async (req, res) => {
    try {
      const image = await imageModel.find();

      return res.status(200).json({ data: image });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //to get user image

  getMyImage: async (req,res)=>{
    try {
      const image = await imageModel.find({user:req.userId})
      return res.status(200).json({ data: image});
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //get image by id

  getImageById: async (req, res) => {
    try {
      const image = await imageModel.findById(req.params.id);

      if (!image) {
        return res.status(404).json({ msg: "no image with this id found" });
      }
      return res.status(200).json({ data: image });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //delete image

  deleteImageById: async (req, res) => {
    try {
      const image = await imageModel.findById(req.params.id);

      if (!image) {
        return res.status(404).json({ msg: "no image with this id found" });
      }
      await image.remove();

      return res.status(200).json({ msg: "image deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //add like and dislike

  toggleLike: async (req, res) => {
    try {
      const image = await imageModel.findById(req.params.id);

      if (!image) {
        return res.status(404).json({ msg: "no image with this id found" });
      }
      if (image.likes.includes(req.userId)) { //if likes includes the userid
        const index = image.likes.indexOf(req.userId); //index is found
        image.likes.splice(index, 1);//remove the id
        image.likeCount = image.likeCount - 1; //count decreases by 1
        await image.save();
        return res.status(200).json({ msg: "image disliked" });
      } else {
        image.likes.push(req.userId);
        image.likeCount = image.likeCount + 1;
        await image.save();
        return res.status(200).json({ msg: "image liked" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //search by category name

  searchByCategory: async (req, res) => {
    try {
      const image = await imageModel.find({ category: req.query.category });
      return res.status(200).json({ data: image });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //adding a comment

  addComment: async (req, res) => {
    try {
      const image = await imageModel.findById(req.params.id);
      if (!image) {
        return res.status(404).json({ msg: "no image with this id found" });
      }
      const comment = new commentModel({
        user: req.userId,
        image: req.params.id,
        text: req.body.text,
      });
      await comment.save();
      image.comments.push(comment._id);
      image.commentCount = image.commentCount + 1;
      await image.save();
      return res.status(200).json({ msg: "comment added" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //deleting a comment

  deleteComment: async (req, res) => {
    try {
      const image = await imageModel.findById(req.params.id);
      const comment = await commentModel.findById(req.params.commentId);
      if (!image) {
        return res.status(404).json({ msg: "no image with this id found" });
      }
      if (!comment) {
        return res.status(404).json({ msg: "no comment with this id found" });
      }
      await comment.remove();
      const index = image.comments.indexOf(comment._id);
      image.comments.splice(index, 1);
      image.commentCount = image.commentCount - 1;
      await image.save();
      return res.status(200).json({ msg: "comment deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //editing a comment
  
  editComment: async (req, res) => {
    try {
      
     const {text}=req.body
     const fieldsToUpdate ={}
     if (text){
      fieldsToUpdate.text =text
     }
     //{...fieldsToUpdate } is a spread operator,it allows us to quickly copy all or part of an existing object into another object.
     const comment =await commentModel.findByIdAndUpdate(req.params.commentId,{
         $set:{...fieldsToUpdate} //set is used to replace
     },{
         new : true
     })
      return res.status(200).json({ msg: "comment edited",data:comment });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = imageControl;
