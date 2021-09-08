import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  currency: {
    type: String,
  },
  stripe_customer_id: {
    type: String,
    default: "",
  },
});

const user = Mongoose.model("User", userSchema);
export default user;
