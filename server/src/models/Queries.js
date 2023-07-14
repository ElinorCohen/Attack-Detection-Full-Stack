const db = require("./Connection");
const config = require("../config.json");

//Checking if the user exists in the database by hie email
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
    const insertedUser = await usersCollection.insertOne(user);
    if (!insertedUser) {
      console.log("Could not push user to Users");
      return resolve(false);
    }

    const insertedPassword = await insertPasswordHistory(email, password);

    if (!insertedPassword) {
      console.log("Something went wrong");
      return resolve(false);
    }

    console.log("Inserted to password history and Users");
    return resolve(true);
  });
};

//Inserting the password to the history so he cant use passwords he used in the past
const insertPasswordHistory = async (email, password) => {
  const currentDate = new Date();

  return new Promise(async (resolve, reject) => {
    const passwordCollection = db.collection("passwordHistory");
    const passwordObject = {
      email,
      password,
      currentDate,
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
        .collection("users_details")
        .updateOne({ email }, { $set: { password: code } });
      console.log(
        "Changing the password of the user with a value from the email"
      );
      return true;
    } catch (error) {
      throw error;
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
};
