const router = require("express").Router();

const authController = require("../controllers/auth");

// Post
router.post("/register", authController.register);

// Post
router.post("/login", authController.login);

module.exports = router;
