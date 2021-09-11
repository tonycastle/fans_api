import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
  username: {
    type: String, //this is your user handle, must be unique
    min: 5,
    unique: true,
  },
  display_name: {
    //this is just the name displayed
    type: String,
    required: true,
    min: 5,
  },
  bio: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    min: 6,
    required: true,
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
  subscription_fee: {
    type: Number,
    default: 0,
  },
  stripe_customer_id: {
    type: String,
    default: "",
  },
  location: {
    //users location
    type: String,
    deault: "",
  },
  website: {
    //website url
    type: String,
    deault: "",
  },
  amazon: {
    //amazon wishlist link
    type: String,
    deault: "",
  },
});

const user = Mongoose.model("User", userSchema);
export default user;
