import User from "../models/User.js";
import bcrypt from "bcrypt";

//TODO: missing the stripe import - seems to be a problem if I import it here and in the payment controller - need to investigate

//create a Stripe Customer Id.  Helper function not a route definition.
const createCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.create();
    return customer.id;
  } catch (error) {
    console.log(error); //should log this to some logging system.
    return undefined;
  }
};

//creates a new user when user registers on the website - need to add data validation in here at some point
export const register = async (req, res) => {
  //get new Stripe Customer Id
  const customerId = createCustomer();

  try {
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userConfig = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    };

    if (customerId !== undefined) userConfig.stripe_id = customerId;

    const newUser = new User(userConfig);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(200).send(error);
  }
};

//gets a userProfile once they have logged in and to poulate their own profile management
export const getUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(200).send(error);
  }
};

//sets the verified status af a user to true after they have verified their identity
//this is if they want to post - ie be a content creator.
export const verify = async (req, res) => {
  try {
  } catch (error) {
    res.status(200).send(error);
  }
};
