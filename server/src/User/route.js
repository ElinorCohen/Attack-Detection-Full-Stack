const express = require("express");
const router = express.Router();
const { verifyToken } = require("./auth");
const {
  login,
  register,
  forgotPassword,
  changePassword,
} = require("./service");

//Not protected routes
router.post("/login", login);
router.post("/register", register);
router.post("/forgotPassword", forgotPassword);

//Protected routes
router.use(verifyToken);
router.post("/changePassword", changePassword);

module.exports = router;
