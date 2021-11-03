const express = require("express");
const Mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js").router;
const postRoutes = require("./routes/postRoutes.js").router;
const paymentRoutes = require("./routes/paymentRoutes.js").router;
const fileUpload = require("express-fileupload");
const passport = require("passport");
const dotenv = require("dotenv");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { authenticate } = require("passport");

dotenv.config();

const app = express();

app.use(fileUpload());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Passport Middleware (authentication)
app.use(passport.initialize());
//Passport Config
require("./config/passport.js")(passport);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/payments", paymentRoutes);

const URL_CONNECTION = process.env.URL_CONNECTION;
const PORT = process.env.PORT || 8800;

Mongoose.connect(URL_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

Mongoose.set("useFindAndModify", false);

//TODO:  should create another route here with jwt.Verify() to error check the token -  should work as Bearer token but doesn't
app.get(
  "/api/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    res.status(200).send({ hello: "hello" });
  }
);

app.post("/api/verify", (req, res) => {
  console.log("hello");
  const { authorization } = req.headers;
  const auth = authorization.split(" ");
  console.log("auth:  ", auth[1]);
  try {
    const decoded = jwt.verify(auth[1], process.env.JWT_SECRET);
    console.log("decoded:", decoded);
  } catch (err) {
    console.log(err);
  }
});
