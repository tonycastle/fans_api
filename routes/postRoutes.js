const express = require("express");
const {
  createPost,
  uploadPostFile,
  getPost,
  getAllPosts,
} = require("../controllers/postsController.js");

const router = express.Router();

router.post("/create", createPost); //create new post
router.post("/uploadPostFile", uploadPostFile); //upload media for a post
router.get("/post", getPost); //get post based on received post id
router.post("/allposts", getAllPosts); //all posts from one user

exports.router = router;
