const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

const { verifyToken } = require("./auth");
const {
  login,
  register,
  forgotPassword,
  changePassword,
  activate,
  changeForgottenPassword,
  deleteAccount,
  getData,
  editUser,
  getRowData,
  getUserData,
  getHistoryData,
  deleteHistoryRow,
} = require("./service");

//Unprotected routes
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/register", register);

router.get("/getRowData/:cve", getRowData);

//Protected routes
router.use(verifyToken);
router.get("/getData/:page", getData);
router.get("/getHistoryData/:page", getHistoryData);
router.get("/activate", activate);
router.get("/getUserData", getUserData);
router.post("/changeForgottenPassword", changeForgottenPassword);
router.get("/deleteAccount", deleteAccount);
router.post("/changePassword", changePassword);
router.post("/editUser", editUser);
router.post("/deleteHistoryRow", deleteHistoryRow);

module.exports = router;
