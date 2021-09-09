import User from "../models/User.js";
import stripe from "../Services/Stripe.js";

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

export const listCards = async (req, res) => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: "cus_KBTthOP6OzIDTt",
      type: "card",
    });
    res.status(200).json(paymentMethods.data);
    console.log("success");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
