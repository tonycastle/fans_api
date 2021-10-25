const Stripe = require("stripe");

exports.stripe = new Stripe(process.env.STRIPE_KEY);
