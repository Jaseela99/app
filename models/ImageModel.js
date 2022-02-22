const mongoose = require("mongoose");

// used for unique identifiers

const { ObjectId } = mongoose.Schema.Types;

const imageSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    path: {
      type: String,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
//model = collection +schema
const imageModel = mongoose.model("Images", imageSchema);
module.exports = imageModel;
