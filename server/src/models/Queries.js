const db = require("./Connection");
const config = require("../../config.json");

//Checking if the user exists in the database by his email
const checkUserExists = async (email) => {
  return new Promise(async (resolve, reject) => {
    const userCollection = db.collection("Users");
    userCollection.findOne({ email }, (err, user) => {
      if (err) return reject(err);
      if (!user) return resolve(false);
      return resolve(true);
    });
  });
};

const edit = async (email, field, newValue) => {
  return new Promise((resolve, reject) => {
    const userCollection = db.collection("Users");
    userCollection.findOne({ email }, (err, user) => {
      if (err) return reject(err);

      user[field] = newValue;

      userCollection.updateOne(
        { email },
        { $set: { [field]: newValue } },
        (err) => {
          if (err) return reject(err);
          return resolve();
        }
      );
    });
  });
};

const findUSer = async (email) => {
  return new Promise(async (resolve, reject) => {
    const userCollection = db.collection("Users");
    userCollection.findOne({ email }, (err, user) => {
      if (err) return reject(err);
      if (!user) return resolve(false);
      return resolve(user);
    });
  });
};

//Register of the user
const insertUser = async (
  email,
  password,
  firstName,
  lastName,
  country,
  status
) => {
  const usersCollection = db.collection("Users");

  const user = {
    email,
    password,
    firstName,
    lastName,
    country,
    status,
    activated: false,
    logins: 0,
    lastTimeLogin: new Date(),
  };

  return new Promise(async (resolve, reject) => {
    try {
      const insertedUser = await usersCollection.insertOne(user);
      if (!insertedUser) {
        console.log("Could not push user to Users collection");
        return resolve(false);
      }

      const insertedPassword = await insertPasswordHistory(email, password);

      if (!insertedPassword) {
        console.log("Something went wrong");
        return resolve(false);
      }

      console.log("Inserted to password history and Users");
      return resolve(true);
    } catch (err) {
      return reject(err);
    }
  });
};

//Inserting the password to the history so he cant use passwords he used in the past
const insertPasswordHistory = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    const passwordCollection = db.collection("passwordHistory");
    const passwordObject = {
      email,
      password,
      currentDate: new Date(),
    };

    const isBiggerThanThreePassword = await isMoreThan3Passwords(email);
    if (isBiggerThanThreePassword) await deleteOldPasswordHistory(email);

    await passwordCollection.insertOne(passwordObject, (err) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

//Returns true or false if the password is more than 3 times in the database
const isMoreThan3Passwords = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const passwordHistoryCollection = db.collection("passwordHistory");
      const count = await passwordHistoryCollection.countDocuments({ email });

      resolve(count >= config.password_history);
    } catch (error) {
      return reject(error);
    }
  });
};

//Deleting the oldest password from the database
const deleteOldPasswordHistory = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const passwordHistoryCollection = db.collection("passwordHistory");
      const oldestPassword = await passwordHistoryCollection.findOne(
        { email },
        { sort: { creationDate: 1 } }
      );

      if (!oldestPassword) {
        console.log("No oldest password found");
        return resolve(true);
      }

      const { creationDate } = oldestPassword;
      await passwordHistoryCollection.deleteOne({ email, creationDate });

      console.log("Removed oldest password successfully");
      return resolve(true);
    } catch (error) {
      console.error("Error removing oldest password:", error);
      return reject(error);
    }
  });
};

//Getting the time of last time login of the user
const lastTimeLogin = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.collection("Users").findOne({ email });
      if (user) return resolve(user.lastTimeLogin);
    } catch (error) {
      return reject(error);
    }
  });
};

//After block duration the logins will go to 0
const resetLogins = async (email) => {
  return new Promise(async (resolve, reject) => {
    await db
      .collection("Users")
      .updateOne({ email }, { $set: { logins: 0 } }, (err) => {
        if (err) return reject(err);
        return resolve(true);
      });
  });
};

//When he is blocked i update the time stamp
const updateTimeStamp = async (email) => {
  return new Promise(async (resolve, reject) => {
    await db
      .collection("Users")
      .findOneAndUpdate(
        { email },
        { $currentDate: { lastTimeLogin: true } },
        (err) => {
          if (err) return reject(err);
          return resolve(true);
        }
      );
  });
};

//Counting the amount of logins so I know when to block the user
const isBlocked = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.collection("Users").findOne({ email });
      if (user && user.logins >= config.login_attempts) return resolve(true);
      return resolve(false);
    } catch (error) {
      return reject(error);
    }
  });
};

//Finding the real password of the user for auth
const findUserPassword = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.collection("Users").findOne({ email });
      if (user) return resolve(user.password);
      return resolve(null);
    } catch (error) {
      return reject(error);
    }
  });
};

//If his password was not right I increment the logins
const incrementLogins = async (email) => {
  return new Promise(async (resolve, reject) => {
    await db
      .collection("Users")
      .updateOne({ email }, { $inc: { logins: 1 } }, (err) => {
        if (err) return reject(err);
        return resolve(true);
      });
  });
};

const changeUserPasswordFromEmail = async (email, code) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db
        .collection("Users")
        .updateOne({ email }, { $set: { password: code } });
      console.log(
        "Changing the password of the user with a value from the email"
      );
      return resolve(true);
    } catch (err) {
      return reject(err);
    }
  });
};

const checkPasswordInHistory = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("passwordHistory");
      const query = { email, password };

      await collection.findOne(query, (err, result) => {
        if (err) return reject(err);
        if (result) {
          console.log("User did use this password before!");
          return resolve(false);
        }
        console.log("User did not use this password!");
        return resolve(true);
      });
    } catch (err) {
      return reject(err);
    }
  });
};

const updatePassword = async (email, newPassword) => {
  const usersCollection = db.collection("Users");

  return new Promise(async (resolve, reject) => {
    try {
      const check = await checkPasswordInHistory(email, newPassword);

      if (!check) {
        return resolve({
          success: false,
          message:
            "The entered password is already used please enter a password you never used",
        });
      }

      const pushPassword = await insertPasswordHistory(email, newPassword);

      if (!pushPassword) {
        throw "Failed pushing to password history";
      }

      await usersCollection.updateOne(
        { email },
        { $set: { password: newPassword } }
      );

      return resolve({
        success: true,
        message: "Password is changed",
      });
    } catch (error) {
      return reject(error);
    }
  });
};

const activate = (email) => {
  return new Promise(async (resolve, reject) => {
    const usersCollection = db.collection("Users");
    try {
      await usersCollection.updateOne({ email }, { $set: { activated: true } });
      return resolve(true);
    } catch (err) {
      return reject(err);
    }
  });
};

const searchFromTable = (searchString, sortOrder) => {
  return new Promise((resolve, reject) => {
    try {
      const usersCollection = db.collection("Users");

      const query = {
        $or: [
          { date: { $regex: searchString, $options: "i" } },
          { attackType: { $regex: searchString, $options: "i" } },
          { description: { $regex: searchString, $options: "i" } },
        ],
      };

      usersCollection.find(query).toArray((err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } catch (err) {
      return reject(err);
    }
  });
};

const isActivated = (email) => {
  return new Promise((resolve, reject) => {
    try {
      const usersCollection = db.collection("Users");

      usersCollection.findOne({ email }, (err, user) => {
        if (err) return reject(err);

        if (user?.activated) return resolve(true);
        return resolve(false);
      });
    } catch (error) {
      return reject(error);
    }
  });
};

const deleteAccount = (email) => {
  return new Promise((resolve, reject) => {
    try {
      const userCollection = db.collection("Users");
      userCollection.deleteOne({ email }, (err) => {
        if (err) return reject(err);
        return resolve(true);
      });
    } catch (error) {
      return reject(error);
    }
  });
};

const getData = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const exploitsCollection = db.collection("Exploits");

      const itemsPerPage = 50;
      const skip = (page - 1) * itemsPerPage;

      const projection = {
        "BASE SCORE (TABLE)": 0,
        EPSS: 0,
        DESCRIPTION: 0,
        _id: 0, // Exclude _id
      };

      const allData = await exploitsCollection
        .find({})
        .project(projection)
        .skip(skip)
        .limit(itemsPerPage)
        .toArray();

      resolve(allData);
    } catch (error) {
      console.error("Error in getData:", error);
      reject(error);
    }
  });
};

module.exports = {
  checkUserExists,
  insertUser,
  insertPasswordHistory,
  isMoreThan3Passwords,
  deleteOldPasswordHistory,
  lastTimeLogin,
  resetLogins,
  updateTimeStamp,
  isBlocked,
  findUserPassword,
  incrementLogins,
  changeUserPasswordFromEmail,
  checkPasswordInHistory,
  updatePassword,
  activate,
  searchFromTable,
  isActivated,
  deleteAccount,
  getData,
  edit,
  findUSer,
};
