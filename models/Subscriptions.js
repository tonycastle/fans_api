const Mongoose = require("mongoose");

const subscriptionSchema = new Mongoose.Schema({
  schema_id: {
    //this gives us a way of migrating our data if we update schema.
    type: Number,
    default: 1,
  },
  creator_id: {
    type: String,
    required: true,
  },
  creator_username: {
    type: String,
    required: true,
  },
  subscriber_id: {
    type: String,
    required: true,
  },
  subscriber_username: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  subscription_price: {
    type: Number,
    default: 0,
  },
  status: {
    //active, onhold - cqn be payment related or maybe in case of fraud
    type: String,
    default: "",
  },
  end_date: {
    //the period when the current subscription ends - for recurring subs this will be updated when we receive payment details from Stripe.
    type: Date,
  },
  payments: {
    //array of completed and outstanding payments for this subscription
    type: Array,
    default: [],
  },
  promotions: {
    type: Array, //store promotions here
    default: [],
  },
});

module.exports = Mongoose.model("Subscription", subscriptionSchema);
