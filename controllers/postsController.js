import Post from "../models/Post.js";
import { v4 as uuidv4 } from "uuid";

//creates a new user when user registers on the website - need to add data validation in here at some point
//POST request expects form data in request body
export const createPost = async (req, res) => {
  try {
    //create new user
    const newPost = new Post({
      owner_id: 123456789,
      owner_username: "Tony77",
      post_text: req.body.post_text,
      files: req.body.files,
    });

    //save the user to the db
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

//gets a specific post GET request, expects post id
export const getPost = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find(); //we wnat to pass the userid here so that we just get our logged in users posts
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const editPost = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deletePost = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
};

//POST request expects multipart form data
// used to upload media files attached to posts
//TODO:  https://www.npmjs.com/package/unique-filename-generator - try this - just using UUID for testing
export const uploadPostFile = (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;

  const path = "../client/src/uploads/" + uuidv4() + file.name;

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });
};
