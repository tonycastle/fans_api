const Mongoose = require("mongoose");

const postSchema = new Mongoose.Schema({
  schema_id: {
    //this gives us a way of migrating our data if we update schema.
    type: Number,
    default: 1,
  },
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
    //can be 'free', 'subscriber' or PPV
    type: String,
    default: "free",
  },
  post_price: {
    type: Number,
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

module.exports = Mongoose.model("Post", postSchema);
