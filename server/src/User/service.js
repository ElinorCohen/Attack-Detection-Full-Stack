const allQueries = require("../models/Queries");
const nodemailer = require("nodemailer");
const config = require("../../config.json");
const jwt = require("jsonwebtoken");
// const Cookie = require("js-cookie");
const axios = require("axios");

module.exports.changePassword = async function (req, res) {
  try {
    const { email } = req.user;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const userRealPassword = await allQueries.findUserPassword(email);

    if (oldPassword !== userRealPassword)
      return res
        .status(400)
        .send("Your old password is incorrect please try again");

    if (newPassword !== confirmNewPassword)
      return res
        .status(400)
        .send("The new password and the confirm password do not match");

    const { success, message } = await allQueries.updatePassword(
      email,
      newPassword
    );

    if (!success) return res.status(400).send(message);
    return res.status(200).send("Password changed succesfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server try again later");
  }
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.forgotPassword = async function (req, res) {
  try {
    const { email } = req.body;
    const userExists = await allQueries.checkUserExists(email);

    if (!userExists) return res.status(404).send("Error: User does not exist");

    const token = jwt.sign({ email }, process.env.JWT_KEY);

    const magicLink = `http://localhost:8000/api/user/changeForgottenPassword?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Forgot Password? Change it here - AttackOmeter",
      html: `
        <p>Click the following button to change your password</p>
        <a href="${magicLink}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Change Password</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .send(
            "An error occurred while sending the link try again later please"
          );
      }
      console.log("Magic link sent:", info.response);
      return res
        .cookie("access_token", token, {
          // httpOnly: true,
        })
        .status(200)
        .send("Please check your email in order to change your password");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.changeForgottenPassword = async function (req, res) {
  try {
    const { newPassword, newConfirmPassword } = req.body;
    const { email } = req.user;

    if (newPassword !== newConfirmPassword)
      return res
        .status(400)
        .send(
          "The new password and the confirm password do not match please try again"
        );

    const { success, message } = await allQueries.updatePassword(
      email,
      newPassword
    );
    if (!success) return res.status(400).send(message);
    return res.status(200).send("The password is changed succesfully");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Error changing password please try again later");
  }
};

module.exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const userAuthentication = await allQueries.checkUserExists(email);

    if (!userAuthentication)
      return res
        .status(400)
        .send("Email or password are wrong please try again");

    const currentTime = new Date();
    const lastTimeLogin = await allQueries.lastTimeLogin(email);
    const timeDiff = (currentTime.getTime() - lastTimeLogin.getTime()) / 60000;
    let isBlocked = await allQueries.isBlocked(email);

    //If he is blocked
    if (isBlocked && timeDiff < config.block_duration) {
      return res
        .status(400)
        .send("You have attempted too many times. Try again later !");
    }
    //If the block duration has passed we reset the logins back to 0
    if (isBlocked && timeDiff > config.block_duration) {
      await allQueries.resetLogins(email);
      isBlocked = false;
    }

    const realPassword = await allQueries.findUserPassword(email);
    const isUserActivated = await allQueries.isActivated(email);
    // console.log(
    //   email,
    //   password,
    //   await allQueries.isValidUserPassword(email, password)
    // );
    // if (password === realPassword && isUserActivated)
    if (
      (await allQueries.isValidUserPassword(email, password)) &&
      isUserActivated
    ) {
      await allQueries.resetLogins(email);
      const token = jwt.sign({ email }, process.env.JWT_KEY);

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: false,
        })
        .status(200)
        .send("Login succeeded");
    }
    //else if (password === realPassword && isUserActivated === false)
    else if (
      (await allQueries.isValidUserPassword(email, password)) &&
      isUserActivated === false
    )
      return res
        .status(400)
        .send(
          "Please activate your account by a link that was sent to your email"
        );

    //If his password is not correct we increment the loging by 1
    await allQueries.incrementLogins(email);

    //If count logins is more or equals than 3 we need to update the last time he tried to enter and update time stamp
    if (isBlocked) {
      //Updating the time to his last try to log in
      await allQueries.updateTimeStamp(email);
      return res
        .status(400)
        .send("You have attempted too many times. Try again later!");
    }
    return res
      .status(400)
      .send("Password or email are wrong! Please try again");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error adding user");
  }
};

module.exports.register = async function (req, res) {
  try {
    const { password, email, firstName, lastName, country, status } = req.body;

    const userExists = await allQueries.checkUserExists(email);
    if (userExists)
      return res.status(400).send("An account with this email already exists");

    const token = jwt.sign({ email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    const userInserted = await allQueries.insertUser(
      email,
      password,
      firstName,
      lastName,
      country,
      status
    );
    if (!userInserted)
      return res
        .status(500)
        .send("An error occurred in the server, please try again later");

    const magicLink = `http://localhost:8000/api/user/activate?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Account Activation - AttackOmeter",
      html: `
        <p>Click the following button to activate your account:</p>
        <a href="${magicLink}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Activate Account</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .send(
            "An error occurred while sending the link try again later please"
          );
      }
      console.log("Magic link sent:", info.response);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send(
          "Registration successful. Check your email for the magic link to activate your account."
        );
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server, please try again later");
  }
};

module.exports.activate = async function (req, res) {
  try {
    const { email } = req.user;
    await allQueries.activate(email);

    return res
      .status(200)
      .send("Account activated successfully please sign in");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error! Please try again later");
  }
};

module.exports.searchInTable = async function (req, res) {
  try {
    const { searchString, sortOrder } = req.body;

    const result = await allQueries.searchFromTable(searchString, sortOrder);

    if (result === false)
      return res.status(404).send("No results found with this sub string");

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.deleteAccount = async function (req, res) {
  try {
    const { email } = req.user;
    const isDeleted = await allQueries.deleteAccount(email);
    if (!isDeleted)
      return res.status(500).send("Could not delete user try again later");

    return res.status(200).send("Your account is deleted successfully");
  } catch (error) {
    return res
      .status(500)
      .send("Error while deleting user please try again later");
  }
};

module.exports.getData = async function (req, res) {
  try {
    const { page } = req.params;
    const { sort, itemsPerPage, searchText, collectionName } = JSON.parse(
      req.headers["data-header"]
    );
    // const { sort, itemsPerPage, searchText, collectionName } = req.body;
    const data = await allQueries.getData(
      page,
      sort,
      itemsPerPage,
      searchText,
      collectionName
    );
    if (!data) return res.status(400).send("Error data is missing");
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error in back please try again later");
  }
};

module.exports.getRowData = async function (req, res) {
  try {
    const { cve } = req.params;
    const { collectionName } = JSON.parse(req.headers["data-header"]);

    const data = await allQueries.getRowData(collectionName, cve);
    if (!data) return res.status(400).send("Error data is missing");
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error in back please try again later");
  }
};

module.exports.editFirstName = async function (req, res) {
  try {
    const { email } = req.user;
    const { newName } = req.body;
    await allQueries.edit(email, "firstName", newName);
    return res.status(200).send("Name changed successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.editLastName = async function (req, res) {
  try {
    const { email } = req.user;
    const { newLastName } = req.body;
    await allQueries.edit(email, "lastName", newLastName);
    return res.status(200).send("Last name changed successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.editCountry = async function (req, res) {
  try {
    const { email } = req.user;
    const { newCountry } = req.body;
    await allQueries.edit(email, "country", newCountry);
    return res.status(200).send("Country name changed successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.editStatus = async function (req, res) {
  try {
    const { email } = req.user;
    const { newStatus } = req.body;
    await allQueries.edit(email, "status", newStatus);
    return res.status(200).send("Status changed successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.getUserData = async function (req, res) {
  try {
    const { email } = req.user;

    const data = await allQueries.getUserData(email);
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server please try again later");
  }
};
