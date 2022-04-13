const express = require("express");
const {
  createPost,
  uploadPostFile,
  getPost,
  getOwnPost,
  getAllPostsFromUser,
  deletePost,
  //deleteImage,
} = require("../controllers/postsController.js");

const router = express.Router();

router.post("/create", createPost); //create new post
router.post("/uploadPostFile", uploadPostFile); //upload media for a post
router.post("/post", getPost); //get post based on received post id
router.post("/ownpost", getOwnPost); //get post based on received post id no increment
router.post("/allpostsfromuser", getAllPostsFromUser); //all posts from one user
router.post("/delete", deletePost);
//router.post("deleteimage", deleteImage);
exports.router = router;
