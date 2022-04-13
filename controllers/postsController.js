const Post = require("../models/Post.js");
const User = require("../models/User.js");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

//creates a new user when user registers on the website - need to add data validation in here at some point
//TODO: get the user id = require(the logged in session
exports.createPost = async (req, res) => {
  try {
    const { ...data } = req.body;
    //console.log(data.files);
    //create new user
    const newPost = new Post(data);

    //save the user to the db
    const post = await newPost.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(400).send(error);
  }
};

//gets a specific post and increments view count expects post id
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.body.id },
      { $inc: { views: 1 } },
      { new: true }
    ).exec();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

//different to getPost as this does not increment post views
exports.getOwnPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.id }).exec();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllPostsFromUser = async (req, res) => {
  try {
    const allPosts = await Post.find({ owner_id: req.body.id }).exec();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.editPost = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletePost = async (req, res) => {
  console.log(req.body.id);
  try {
    //TODO: delete any media associated with this post before we delete it
    //if something goes wrong with image deletion we need to know, but the user doesn't care
    //maybe we can just record the file details to another system that does bulk deletions
    await Post.deleteOne({ _id: req.body.id }).exec();
    res.status(200).send({ message: "sucessfully deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

//POST request expects multipart form data
// used to upload media files attached to posts
//TODO:  https://www.npmjs.com/package/unique-filename-generator - try this - just using UUID for testing
exports.uploadPostFile = (req, res) => {
  if (!req.files) {
    console.log("no files");
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;

  const folder = path.join("..", "client", "public", "images");
  const name = uuidv4() + file.name;
  const filePath = path.join(folder, name);

  file.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: name });
  });
};
