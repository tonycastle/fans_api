const Post = require("../models/Post.js");
const User = require("../models/User.js");
const uuidv4 = require("uuid");

//creates a new user when user registers on the website - need to add data validation in here at some point
//TODO: get the user id = require(the logged in session
exports.createPost = async (req, res) => {
  try {
    const { ...data } = req.body;
    data.owner_id = 123456789;
    data.owner_username = "Tony77";

    /* {
      
      post_text: req.body.post_text,
      post_price: 
      post_access:
      files: req.body.files,
    } */

    //create new user
    const newPost = new Post(data);

    //save the user to the db
    const post = await newPost.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(400).send(error);
  }
};

//gets a specific post GET request, expects post id
exports.getPost = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({ owner_id: req.body.id }).exec();
    res.status(200).json({ success: true, allPosts });
  } catch (error) {
    res.status(200).send({ success: false, message: error });
  }
};

exports.editPost = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
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

  const folder = "../client/public/images/";
  const fileName = uuidv4() + file.name;
  const path = folder + fileName;

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: fileName });
  });
};
