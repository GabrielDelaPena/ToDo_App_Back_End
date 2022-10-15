const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Check if there is a token from req.header
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    // Verify the token, return the _id
    // Add user property to req and sign the verefied token variable
    // Call next() middleware
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
