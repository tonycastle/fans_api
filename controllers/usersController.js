import User from "../models/User.js";
import bcrypt from "bcrypt";
import stripe from "../Services/Stripe.js";

//create a Stripe Customer Id.  Helper function not a route definition.
const createCustomer = async (email) => {
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
  //see if the email is taken already, if it is get out and return failure.
  try {
    const userCheck = await User.findOne({ email: req.body.email }).exec();
    console.log(`userCheck: ${userCheck}`);
    if (userCheck) {
      res.status(200).json({ success: false, message: "Email is taken" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
  console.log("still in the register ffunction");
  //get new Stripe Customer Id
  const customerId = await createCustomer({
    email: req.body.email,
  });

  try {
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userConfig = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    };

    if (customerId !== undefined) userConfig.stripe_customer_id = customerId;

    console.log(userConfig);

    const newUser = new User(userConfig);
    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

//login a user
export const login = async (req, res) => {
  //first find user based on email
  const user = await User.findOne({ email: req.body.email }).exec();
  //if no user found we already failed login.
  if (!user) {
    res.status(200).json({ success: false, message: "Incorrect Credentials" });
    return;
  }
  //check if the password matches the hashed user password
  bcrypt.compare(req.body.password, user.password, function (err, response) {
    if (err) {
      console.log(error);
    }

    if (response) {
      // TODO: Send JWT
      res.status(200).json({ success: true, message: "passwords match" });
    } else {
      console.log(`response: ${response}`);
      res
        .status(200)
        .json({ success: false, message: "Incorrect Credentials" });
    }
  });
};

//sets the verified status af a user to true after they have verified their identity
//this is if they want to post - ie be a content creator.
export const verify = async (req, res) => {
  try {
  } catch (error) {
    res.status(200).send(error);
  }
};
