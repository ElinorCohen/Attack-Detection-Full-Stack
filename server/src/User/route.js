const express = require("express");
const router = express.Router();
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
  getDataLength,
} = require("./service");

//Unprotected routes
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/register", register);
router.get("/getData/:page", getData);
router.get("/getDataLength/:collectionName", getDataLength);

//Protected routes
router.use(verifyToken);
router.post("/searchInTable", searchInTable);
router.post("/changeForgottenPassword", changeForgottenPassword);
router.get("/activate", activate);
router.post("/deleteAccount", deleteAccount);
router.post("/changePassword", changePassword);
router.post("/editFirstName", editFirstName);
router.post("/editLastName", editLastName);
router.post("/editCountry", editCountry);
router.post("/editStatus", editStatus);

module.exports = router;
