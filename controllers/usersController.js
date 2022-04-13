const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const stripe = require("stripe")(
  "sk_test_51JWsLSBhgw4Dhe1cWPDvWBARx0FaPSZTYGvXJHfMKwSslA96HcPAGeYeZRlc6jsWy3QOI4c6flEJLGyNhTqMK0Ml00TB32toKn"
);
const jwt = require("jsonwebtoken");

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
exports.register = async (req, res) => {
  //see if the email is taken already, if it is get out and return failure.
  try {
    const userCheck = await User.findOne({ email: req.body.email }).exec();
    if (userCheck) {
      res.status(200).json({ success: false, message: "Email is taken" });
      return;
    }
  } catch (error) {
    console.log(error);
  }

  //get new Stripe Customer Id
  const customerId = await createCustomer({
    email: req.body.email,
  });

  try {
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userConfig = {
      display_name: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    };

    if (customerId !== undefined) userConfig.stripe_customer_id = customerId;

    console.log(userConfig);

    const newUser = new User(userConfig);
    const user = await newUser.save();
    console.log(user);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(200).send({ success: false, error });
  }
};

//login a user
exports.login = async (req, res) => {
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
      const payload = {
        id: user._id,
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        },
        (err, token) => {
          res.status(200).json({
            success: true,
            token: `JWT ${token}`,
            user: user,
          });
        }
      );
    } else {
      res
        .status(200)
        .json({ success: false, message: "Incorrect Credentials" });
    }
  });
};

//get a users details for profile page - should not send anything sensitive here eg stripe number etc.
// This is not a users own profile page.
exports.getOtherProfile = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne(
      { _id: req.body.id },
      "display_name bio followers subscription_fee profilePicture coverPicture"
    ).exec();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//get a users own details for profile page
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id }).exec();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//sets the verified status af a user to true after they have verified their identity
//this is if they want to post - ie be a content creator.
exports.verify = async (req, res) => {
  try {
  } catch (error) {
    res.status(200).send(error);
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { _id, ...data } = req.body;
    console.log(req.body);
    const result = await User.updateOne({ _id: _id }, data);

    console.log(`matched: ${result.n}, modified: ${result.nModified}`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

//this is used in the edit profile form to validate before form submission.
exports.checkUsername = async (req, res) => {
  try {
    const result = await User.findOne({ username: req.body.username }).exec();
    console.log(result);
    !result && res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ success: false, error });
    console.log(error);
  }
};
