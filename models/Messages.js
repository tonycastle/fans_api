const Mongoose = require("mongoose");

const messageSchema = new Mongoose.Schema({
  sender_id: {
    type: String,
  },
  schema_id: {
    //this gives us a way of migrating our data if we update schema.
    type: Number,
    default: 1,
  },
  sender_display_name: {
    type: String,
    required: true,
  },
  receiver_id: {
    type: String,
    required: true,
  },
  receiver_display_name: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  message_text: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "unread",
  },
});

module.exports = Mongoose.model("Message", messageSchema);
