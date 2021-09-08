import express from "express";
import Mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(fileUpload());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/payments", paymentRoutes);

const URL_CONNECTION =
  "mongodb://localhost:27017/realfans?retrywrites=true&=majority";

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
