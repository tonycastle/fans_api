import User from "../models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51JWsLSBhgw4Dhe1cWPDvWBARx0FaPSZTYGvXJHfMKwSslA96HcPAGeYeZRlc6jsWy3QOI4c6flEJLGyNhTqMK0Ml00TB32toKn"
);

export const addCard = async (req, res) => {
  try {
    const intent = await stripe.setupIntents.create({
      //for testing we are hard wiring this in but in future we should pull this straight from the user db model.
      customer: "cus_KBTthOP6OzIDTt",
    });
    console.log(intent);
    res.status(200).json({ client_secret: intent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
