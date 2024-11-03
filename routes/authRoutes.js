const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const dotenv = require("dotenv");
const authControllers = require("../controllers/authControllers");

dotenv.config();

// Register a new user
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 8 or more characters").isLength({
      min: 8,
    }),
  ],
  authControllers.register
);

// Login user and generate JWT
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authControllers.login
);

module.exports = router;
