import express from "express";
import * as Users from "../controllers/usersController.js";

const router = express.Router();

router.post("/register", Users.register);
router.post("/verify", Users.verify);
router.post("/login", Users.login);

export default router;
