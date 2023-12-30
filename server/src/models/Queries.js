const db = require("./Connection");
const config = require("../../config.json");
const {
  isCSRFAttack,
  isNoSQLInjection,
  isXSSAttack,
} = require("../../AttackDetection/functions.js");

//Checking if the user exists in the database by his email
const checkUserExists = async (email) => {
  try {
    email = JSON.parse(email);
  } catch {}
  // console.log({ email });
  return new Promise(async (resolve, reject) => {
    const userCollection = db.collection("Users");
    userCollection.findOne({ email }, (err, user) => {
      // console.log(user, err);
      if (err) return reject("User not found, please try again");
      if (!user) return resolve(false);
      return resolve(true);
    });
  });
};

const getUserData = async (email) => {
  return new Promise(async (resolve, reject) => {
    const userCollection = db.collection("Users");
    // const projection = {
    //   password: 0,
    //   activated: 0,
    //   logins: 0,
    //   lastTimeLogin: 0,
    //   _id: 0, // Exclude _id
    // };
    try {
      const data = await userCollection.findOne({ email });
      resolve(data);
    } catch (err) {
      return reject(err);
    }
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
  try {
    email = JSON.parse(email);
  } catch {}
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
      email = JSON.parse(email);
    } catch {}
    // console.log({ email });
    try {
      const user = await db.collection("Users").findOne({ email });
      if (user) return resolve(user.password);
      return resolve(null);
    } catch (error) {
      return reject(error);
    }
  });
};

//Finding the real password of the user for auth
const isValidUserPassword = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      password = JSON.parse(password);
      if (typeof password === "number") {
        password = String(password);
      }
    } catch {}
    try {
      email = JSON.parse(email);
    } catch {}
    try {
      // console.log({ email, password });
      const user = await db.collection("Users").findOne({ email, password });
      return resolve(user !== null);
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
      try {
        email = JSON.parse(email);
      } catch {}
      // console.log({ email });
      const usersCollection = db.collection("Users");
      usersCollection.findOne({ email }, (err, user) => {
        if (err) return reject(err);
        // console.log(user);
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

const insertHistory = async (data) => {
  return new Promise((resolve, reject) => {
    const AttacksCollection = db.collection("attackHistory");
    AttacksCollection.insertOne(data, (err, res) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

const getData = (
  email,
  page,
  sort,
  itemsPerPage,
  searchText,
  collectionName
) => {
  return new Promise(async (resolve, reject) => {
    let attack = "None";
    try {
      if (isCSRFAttack(searchText)) {
        attack = "CSRF";
      } else if (isXSSAttack(searchText)) {
        attack = "XSS";
      } else if (isNoSQLInjection(searchText)) {
        attack = "NoSQLInjection";
      }

      let historyData = {};

      if (attack !== "None") {
        const date = new Date();

        historyData = {
          EMAIL: email,
          TIME: date.toUTCString(),
          INPUT: searchText,
          "ATTACK TYPE": attack,
          "ATTACK WEB LOCATION": "Home page - search",
        };
      }

      const exploitsCollection = db.collection(`${collectionName}`);

      const skip = (page - 1) * parseInt(itemsPerPage);

      const projection = {
        MaxBaseScoreSort: 0,
        CategorySort: 0,
        EPSS: 0,
        DESCRIPTION: 0,
        _id: 0, // Exclude _id
      };

      let searchQuery = {};

      if (searchText) {
        try {
          searchQuery = JSON.parse(searchText);
        } catch {
          searchQuery = {
            $or: [
              { CVE: { $regex: `${searchText}`, $options: "i" } }, // Case-insensitive search
              { PUBLISHED: { $regex: `${searchText}`, $options: "i" } },
              { UPDATED: { $regex: `${searchText}`, $options: "i" } },
              { CATEGORY: { $regex: `${searchText}`, $options: "i" } },
              { MaxBaseScoreSort: { $regex: `${searchText}`, $options: "i" } },
            ],
          };
        }
      }
      // console.log(searchQuery);

      // Check if a sort field is specified and create the index
      if (sort) {
        const indexField = Object.keys(sort)[0]; // Get the field to be indexed
        const indexDirection = parseInt(sort[indexField]); // Get the sort direction (1 or -1)

        // Check if indexDirection is a valid number
        if (!isNaN(indexDirection)) {
          const indexSpec = {};
          indexSpec[indexField] = indexDirection; // Create the index specification

          // Create the index
          await exploitsCollection.createIndex(indexSpec);
        } else {
          console.error("Invalid indexDirection:", indexDirection);
        }
      }

      const dataSize = await exploitsCollection.countDocuments(searchQuery);

      const allData = await exploitsCollection
        .find(searchQuery)
        .project(projection)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(itemsPerPage))
        .toArray();

      resolve({
        data: allData,
        size: dataSize,
        attackDetected: attack,
        history: historyData,
      });
    } catch (error) {
      console.error("Error in getData:", error);
      reject(error);
    }
  });
};

const getRowData = (collectionName, cveString) => {
  return new Promise(async (resolve, reject) => {
    try {
      const exploitsCollection = db.collection(`${collectionName}`);

      const projection = {
        MaxBaseScoreSort: 0,
        CategorySort: 0,
        _id: 0, // Exclude _id
      };

      const searchQuery = {
        $or: [
          { CVE: { $regex: `${cveString}` } }, // Case-insensitive search
        ],
      };

      const rowData = await exploitsCollection
        .find(searchQuery)
        .project(projection)
        .toArray();
      resolve(rowData);
    } catch (error) {
      console.error("Error in getData:", error);
      reject(error);
    }
  });
};

const edit = async (email, user) => {
  return new Promise((resolve, reject) => {
    let attack = "None";
    let input = "";
    let location = "";
    if (isCSRFAttack(user.firstName)) {
      attack = "CSRF";
      input = user.firstName;
      location = "first name";
    } else if (isXSSAttack(user.firstName)) {
      attack = "XSS";
      input = user.firstName;
      location = "first name";
    } else if (isNoSQLInjection(user.firstName)) {
      attack = "NoSQLInjection";
      input = user.firstName;
      location = "first name";
    }

    if (isCSRFAttack(user.lastName)) {
      attack = "CSRF";
      input = user.lastName;
      location = "last name";
    } else if (isXSSAttack(user.lastName)) {
      attack = "XSS";
      input = user.lastName;
      location = "last name";
    } else if (isNoSQLInjection(user.lastName)) {
      attack = "NoSQLInjection";
      input = user.lastName;
      location = "last name";
    }

    let historyData = {};

    if (attack !== "None") {
      const date = new Date();

      historyData = {
        EMAIL: email,
        TIME: date.toUTCString(),
        INPUT: input,
        "ATTACK TYPE": attack,
        "ATTACK WEB LOCATION": `Profile page - edit ${location}`,
      };
    }

    const userCollection = db.collection("Users");
    userCollection.findOne({ email }, (err, res) => {
      if (err) return reject(err);
      // console.log({ email }, user);
      userCollection.updateOne({ email }, { $set: user }, (err) => {
        if (err) return reject(err);
        return resolve({ attackDetected: attack, history: historyData });
      });
    });
  });
};

const getHistoryData = (
  email,
  page,
  sort,
  itemsPerPage,
  searchText,
  collectionName
) => {
  return new Promise(async (resolve, reject) => {
    let attack = "None";
    try {
      if (isCSRFAttack(searchText)) {
        attack = "CSRF";
      } else if (isXSSAttack(searchText)) {
        attack = "XSS";
      } else if (isNoSQLInjection(searchText)) {
        attack = "NoSQLInjection";
      }

      let historyData = {};

      if (attack !== "None") {
        const date = new Date();

        historyData = {
          EMAIL: email,
          TIME: date.toUTCString(),
          INPUT: searchText,
          "ATTACK TYPE": attack,
          "ATTACK WEB LOCATION": "History page - search",
        };
      }

      const attacksCollection = db.collection(`${collectionName}`);

      const skip = (page - 1) * parseInt(itemsPerPage);

      const projection = {
        EMAIL: 0,
        _id: 0, // Exclude _id
      };

      let searchQuery = {};

      if (searchText) {
        searchQuery = {
          $and: [
            { EMAIL: { $regex: `^${email}$`, $options: "i" } },

            {
              $or: [
                {
                  TIME: {
                    $regex: `${searchText}`,
                    $options: "i",
                  },
                }, // Case-insensitive search
                {
                  INPUT: {
                    $regex: `${searchText}`,
                    $options: "i",
                  },
                },
                {
                  "ATTACK TYPE": {
                    $regex: `${searchText}`,
                    $options: "i",
                  },
                },
                {
                  "ATTACK WEB LOCATION": {
                    $regex: `${searchText}`,
                    $options: "i",
                  },
                },
              ],
            },
          ],
        };
      } else {
        searchQuery = { EMAIL: email };
      }

      // Check if a sort field is specified and create the index
      if (sort) {
        const indexField = Object.keys(sort)[0]; // Get the field to be indexed
        const indexDirection = parseInt(sort[indexField]); // Get the sort direction (1 or -1)

        // Check if indexDirection is a valid number
        if (!isNaN(indexDirection)) {
          const indexSpec = {};
          indexSpec[indexField] = indexDirection; // Create the index specification

          // Create the index
          await attacksCollection.createIndex(indexSpec);
        } else {
          console.error("Invalid indexDirection:", indexDirection);
        }
      }

      const dataSize = await attacksCollection.countDocuments(searchQuery);

      const allData = await attacksCollection
        .find(searchQuery)
        .project(projection)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(itemsPerPage))
        .toArray();
      resolve({
        data: allData,
        size: dataSize,
        attackDetected: attack,
        history: historyData,
      });
    } catch (error) {
      console.error("Error in getData:", error);
      reject(error);
    }
  });
};

const deleteHistoryRow = async (email, data) => {
  try {
    const historyCollection = db.collection("attackHistory");
    const filter = { ...data.body, EMAIL: email };
    console.log(filter);
    const result = await historyCollection.deleteOne(filter);

    if (!result) {
      console.error("deleteOne operation did not return a result:", result);
      return false;
    }

    if (result.deletedCount === 1) {
      console.log("Document deleted successfully:", result);
      return true;
    } else {
      console.warn("Document not found or not deleted:", result);
      return false;
    }
  } catch (error) {
    console.error("Error in deleteHistoryRow:", error);
    throw error;
  }
};

module.exports = {
  checkUserExists,
  insertHistory,
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
  getRowData,
  getUserData,
  isValidUserPassword,
  getHistoryData,
  deleteHistoryRow,
};
