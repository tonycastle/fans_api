import express from "express";
import * as Posts from "../controllers/postsController.js";

const router = express.Router();

router.post("/create", Posts.createPost); //create new post
router.post("/uploadPostFile", Posts.uploadPostFile); //upload media for a post
router.get("/post", Posts.getPost); //get post based on received post id
router.post("/allposts", Posts.getAllPosts); //all posts from one user

export default router;
