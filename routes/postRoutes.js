import express from "express";
import * as Posts from "../controllers/postsController.js";

const router = express.Router();

router.post("/create", Posts.createPost);
router.post("/uploadPostFile", Posts.uploadPostFile);
router.get("/post", Posts.getPost);
router.get("/posts", Posts.getAllPosts);

export default router;
