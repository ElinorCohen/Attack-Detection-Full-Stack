const allQueries = require("../models/Queries");
const nodemailer = require("nodemailer");
const config = require("../../config.json");
const jwt = require("jsonwebtoken");
// const Cookie = require("js-cookie");
const axios = require("axios");
const {
  isCSRFAttack,
  isXSSAttack,
  isNoSQLInjection,
} = require("../../AttackDetection/functions");

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function generateRandomString(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }

  return randomString;
}

module.exports.changePassword = async function (req, res) {
  try {
    const { email } = req.user;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    console.log(oldPassword, newPassword, confirmPassword);
    const userRealPassword = await allQueries.findUserPassword(email);

    if (oldPassword !== userRealPassword)
      return res
        .status(400)
        .send("Your old password is incorrect please try again");

    if (newPassword !== confirmPassword)
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

module.exports.forgotPassword = async function (req, res) {
  try {
    const { email } = req.body;
    const userExists = await allQueries.checkUserExists(email);

    if (!userExists) return res.status(404).send("Error: User does not exist");

    const token = jwt.sign({ email }, process.env.JWT_KEY);

    // const magicLink = `http://localhost:8000/api/user/changeForgottenPassword?token=${token}`;
    const newPassword = generateRandomString(8);
    console.log(newPassword);

    // const { success, message } = await allQueries.updatePassword(
    //   email,
    //   newPassword
    // );
    // if (!success) return res.status(400).send(message);
    // return res.status(200).send("The password is changed succesfully");

    // return res
    //   .status(500)
    //   .send("Error changing password please try again later");

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "AttackOmeter",
      text: `Your new password is: ${newPassword}`,
      // html: `
      //   <p>Click the following button to change your password</p>
      //    <a href="${magicLink}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Change Password</a>
      // `,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .send(
            "An error occurred while sending the message, please try again later"
          );
      }
      console.log("Email sent:", info.response);
      try {
        const { success, message } = await allQueries.updatePassword(
          email,
          newPassword
        );
        if (!success) return res.status(400).send(message);

        return (
          res
            // .cookie("access_token", token, {
            //   // httpOnly: true,
            // })
            .status(200)
            .send("Please check your email in order to change your password")
        );
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send("Error changing password please try again later");
      }
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
    let attack = "None";
    if (isCSRFAttack(email) || isCSRFAttack(password)) {
      attack = "CSRF";
    } else if (isXSSAttack(email) || isXSSAttack(password)) {
      attack = "XSS";
    } else if (isNoSQLInjection(email) || isNoSQLInjection(password)) {
      attack = "NoSQLInjection";
    }

    let historyData = {};

    if (attack !== "None" && validateEmail(email)) {
      const date = new Date();

      historyData = {
        EMAIL: email,
        TIME: date.toUTCString(),
        INPUT: password,
        "ATTACK TYPE": attack,
        "ATTACK WEB LOCATION": "Login page",
      };
      try {
        await allQueries.insertHistory(historyData);
      } catch {
        console.log("Error inserting to History");
      }
    }

    const userAuthentication = await allQueries.checkUserExists(email);
    console.log(userAuthentication);
    if (!userAuthentication)
      return res.status(400).send({
        message: "Email or password are wrong please try again",
        detectedAttack: attack,
      });

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

    // const realPassword = await allQueries.findUserPassword(email);
    const isUserActivated = await allQueries.isActivated(email);
    // console.log(await allQueries.isValidUserPassword(email, password));
    // console.log(isUserActivated);

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
      // console.log(token);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: false,
        })
        .status(200)
        .send({ message: "Login succeeded", detectedAttack: attack });
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
    return res.status(400).send({
      message: "Password or email are wrong! Please try again",
      detectedAttack: attack,
    });
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

    let attack = "None";
    let input = "";
    let location = "";
    if (isCSRFAttack(email)) {
      attack = "CSRF";
      input = email;
      location = "email";
    } else if (isXSSAttack(email)) {
      attack = "XSS";
      input = email;
      location = "email";
    } else if (isNoSQLInjection(email)) {
      attack = "NoSQLInjection";
      input = email;
      location = "email";
    }

    if (isCSRFAttack(password)) {
      attack = "CSRF";
      input = password;
      location = "password";
    } else if (isXSSAttack(password)) {
      attack = "XSS";
      input = password;
      location = "password";
    } else if (isNoSQLInjection(password)) {
      attack = "NoSQLInjection";
      input = password;
      location = "password";
    }

    if (isCSRFAttack(firstName)) {
      attack = "CSRF";
      input = firstName;
      location = "firstName";
    } else if (isXSSAttack(firstName)) {
      attack = "XSS";
      input = firstName;
      location = "firstName";
    } else if (isNoSQLInjection(firstName)) {
      attack = "NoSQLInjection";
      input = firstName;
      location = "firstName";
    }

    if (isCSRFAttack(lastName)) {
      attack = "CSRF";
      input = lastName;
      location = "lastName";
    } else if (isXSSAttack(lastName)) {
      attack = "XSS";
      input = lastName;
      location = "lastName";
    } else if (isNoSQLInjection(lastName)) {
      attack = "NoSQLInjection";
      input = lastName;
      location = "lastName";
    }

    let historyData = {};

    if (attack !== "None" && validateEmail(email)) {
      const date = new Date();

      historyData = {
        EMAIL: email,
        TIME: date.toUTCString(),
        INPUT: input,
        "ATTACK TYPE": attack,
        "ATTACK WEB LOCATION": `Register page - insert ${location}`,
      };
      try {
        await allQueries.insertHistory(historyData);
      } catch {
        console.log("Error inserting to History");
      }
    }

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
      return res.cookie("access_token", token).status(200).send({
        message:
          "Registration successful. Check your email for the magic link to activate your account.",
        detectedAttack: attack,
      });
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

    return res.status(200).send("Your account has been deleted successfully");
  } catch (error) {
    return res
      .status(500)
      .send("Error while deleting user please try again later");
  }
};

module.exports.getData = async function (req, res) {
  try {
    const { email } = req.user;
    const { page } = req.params;
    const { sort, itemsPerPage, searchText, collectionName } = JSON.parse(
      req.headers["data-header"]
    );
    // const { sort, itemsPerPage, searchText, collectionName } = req.body;
    const data = await allQueries.getData(
      email,
      page,
      sort,
      itemsPerPage,
      searchText,
      collectionName
    );

    if (Object.keys(data.history).length !== 0) {
      try {
        await allQueries.insertHistory(data.history);
      } catch {
        console.log("Error inserting to History");
      }
    }

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

module.exports.editUser = async function (req, res) {
  try {
    const { email } = req.user;
    const user = req.body;
    delete user["_id"];
    delete user["email"];
    delete user["password"];
    delete user["activated"];
    delete user["logins"];
    delete user["lastTimeLogin"];

    // console.log(user);
    const response = await allQueries.edit(email, user);

    if (Object.keys(response.history).length !== 0) {
      try {
        await allQueries.insertHistory(response.history);
      } catch {
        console.log("Error inserting to History");
      }
    }

    return res.status(200).send(response);
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

module.exports.getHistoryData = async function (req, res) {
  try {
    const { email } = req.user;
    const { page } = req.params;
    const { sort, itemsPerPage, searchText, collectionName } = JSON.parse(
      req.headers["data-header"]
    );
    // const { sort, itemsPerPage, searchText, collectionName } = req.body;
    const data = await allQueries.getHistoryData(
      email,
      page,
      sort,
      itemsPerPage,
      searchText,
      collectionName
    );

    if (Object.keys(data.history).length !== 0) {
      try {
        await allQueries.insertHistory(data.history);
      } catch {
        console.log("Error inserting to History");
      }
    }

    if (!data) return res.status(400).send("Error data is missing");
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error in back please try again later");
  }
};

module.exports.deleteHistoryRow = async function (req, res) {
  try {
    const { email } = req.user;
    const data = req.body;
    console.log(data);
    const isDeleted = await allQueries.deleteHistoryRow(email, data);
    if (!isDeleted)
      return res.status(500).send("Could not delete row try again later");

    return res.status(200).send("Row has been deleted successfully");
  } catch (error) {
    return res
      .status(500)
      .send("Error while deleting row please try again later");
  }
};
