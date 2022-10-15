const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

const User = require("../models/User");

// Register
exports.register = async (req, res, next) => {
  // Validate data before adding new user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user exist already
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return res.status(400).send("User already exist.");
  }

  // Body data
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // New user object
  const user = new User({
    email: email,
    username: username,
    password: hashedPassword,
    lists: [],
  });

  try {
    const savedUser = await user.save();
    console.log("USER CREATED");
    res.status(200).json({ userId: savedUser._id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  // Valdiate before logging user
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Checking if user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("Email not found.");
  }

  // Password validation
  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    return res.status(404).send("Invalid password.");
  }

  // Create and assign token, set token to header and send token to client side
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  console.log("USER LOGGEDIN");
  res.header("auth-token", token).json({ token: token, userId: user._id });
};
