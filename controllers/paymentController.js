const User = require("../models/User.js");
const stripe = require("stripe")(
  "sk_test_51JWsLSBhgw4Dhe1cWPDvWBARx0FaPSZTYGvXJHfMKwSslA96HcPAGeYeZRlc6jsWy3QOI4c6flEJLGyNhTqMK0Ml00TB32toKn"
);

exports.addCard = async (req, res) => {
  try {
    //Get Stripe customer id
    const user = await User.findOne(
      { _id: req.body.id },
      "stripe_customer_id"
    ).exec();

    const intent = await stripe.setupIntents.create({
      customer: user.stripe_customer_id,
    });
    //console.log(intent);
    res.status(200).json({ client_secret: intent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.listCards = async (req, res) => {
  try {
    //Get Stripe customer id
    const user = await User.findOne(
      { _id: req.body.id },
      "stripe_customer_id"
    ).exec();

    //limit the data that is  sent to the front end for security:
    //card number, id, expiry_month-, expirey_year, brand
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripe_customer_id,
      type: "card",
    });
    const filteredMethods = paymentMethods.data.map((pm) => ({
      id: pm.id,
      brand: pm.card.brand,
      last4: pm.card.last4,
      created: pm.created,
      exp_month: pm.card.exp_month,
      exp_year: pm.card.exp_year,
    }));
    res.status(200).json(filteredMethods);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.deleteCard = async (req, res) => {
  try {
    console.log("delete: ", req.body.id);
    const paymentMethod = await stripe.paymentMethods.detach(req.body.id);
    res.status(200).send(paymentMethod);
  } catch (err) {
    res.status(400).send(err);
  }
};
