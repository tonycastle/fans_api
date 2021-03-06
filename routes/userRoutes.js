const express = require("express");
const passport = require("passport");

const {
  register,
  verify,
  login,
  getOtherProfile,
  getProfile,
  editProfile,
} = require("../controllers/usersController.js");

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/login", login);
router.post("/getother", getOtherProfile);
router.post(
  "/getown",
  passport.authenticate("jwt", { session: false }),
  getProfile
);
router.post("/edit", editProfile);

exports.router = router;
