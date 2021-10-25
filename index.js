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

dotenv.config();

const app = express();

app.use(fileUpload());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

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

//Passport Middleware (authentication)
app.use(passport.initialize());
//Passport Config
require("./config/passport.js")(passport);

app.get(
  "/api/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    res.status(200).send({ hello: "hello" });
  }
);
