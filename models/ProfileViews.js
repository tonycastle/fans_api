const Mongoose = require("mongoose");

//just records , time of the view - later will store age, gender, location etc of user that viewed

const profileViewSchema = new Mongoose.Schema({
  schema_id: {
    //this gives us a way of migrating our data if we update schema.
    type: Number,
    default: 1,
  },
  time: {
    type: Date,
    default: Date.now,
  },

  post_id: {
    type: Number,
  },
});

module.exports = Mongoose.model("ProfileViews", profileViewSchema);
