const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

const { verifyToken } = require("./auth");
const {
  login,
  register,
  forgotPassword,
  changePassword,
  searchInTable,
  activate,
  changeForgottenPassword,
  deleteAccount,
  getData,
  editFirstName,
  editLastName,
  editCountry,
  editStatus,
  getRowData,
  getUserData,
} = require("./service");

//Unprotected routes
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/register", register);
router.get("/getData/:page", getData);
router.get("/getRowData/:cve", getRowData);

//Protected routes
router.use(verifyToken);
router.get("/activate", activate);
router.get("/getUserData", getUserData);
router.post("/changeForgottenPassword", changeForgottenPassword);
router.post("/deleteAccount", deleteAccount);
router.post("/changePassword", changePassword);
router.post("/editFirstName", editFirstName);
router.post("/editLastName", editLastName);
router.post("/editCountry", editCountry);
router.post("/editStatus", editStatus);

module.exports = router;
