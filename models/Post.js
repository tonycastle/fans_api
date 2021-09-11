import Mongoose from "mongoose";
import Float from "mongoose-float";

//set the decimal places to 2 for money
Float.loadType(Mongoose, 2);

const postSchema = new Mongoose.Schema({
  post_text: {
    type: String,
  },
  owner_id: {
    type: String,
    required: true,
  },
  owner_username: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  post_access: {
    /* can be free or paid - might not need this, possibly we can just check the price - if it is 00.00 then it's free
     alternatively we may still need this if we have a situation where creator offers subscription but has some premium 
     content that even subscribers need to pay for.
     */
    type: String,
    default: "free",
  },
  post_price: {
    type: Float,
    default: 0,
  },
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    users: {
      //usernames who liked this post
      type: Array, //not sure if this wil be usernames or user id's depends how it will be used
    },
  },
  files: {
    // any files that were uploaded with the post ie images or videos
    type: Array,
    default: [],
  },
  subscribers: {
    // an array of subscribers allowed to see this - ie those who have paid. This will be user id's.
    type: Array,
    default: [],
  },
});

const post = Mongoose.model("Post", postSchema);
export default post;
