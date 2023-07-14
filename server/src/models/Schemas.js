//const db = require("../models/Connection");

// db.createCollection("Users", {
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       required: [
//         "email",
//         "firstName",
//         "lastName",
//         "password",
//         "country",
//         "status",
//       ],
//       properties: {
//         email: {
//           bsonType: "string",
//           description: "Email address of the user.",
//         },
//         firstName: {
//           bsonType: "string",
//           description: "First name of the user.",
//         },
//         lastName: {
//           bsonType: "string",
//           description: "Last name of the user.",
//         },
//         country: {
//           bsonType: "string",
//           description: "Country of the user",
//         },
//         password: {
//           bsonType: "string",
//           description: "Password of the user.",
//         },
//         status: {
//           bsonType: "string",
//           description:
//             "Status of the user (student, employee, teacher, or other)",
//         },
//         activated: {
//           bsonType: "bool",
//           description: "Check if the user activated his account from email",
//         },
//         logins: {
//           bsonType: "int",
//           description:
//             "How many times he entered incorrect password while logging in",
//         },
//         lastTimeLogin: {
//           bsonType: "date",
//           description: "When was the last time when he tried to log in",
//         },
//       },
//     },
//   },
// });

// try {
//   const passwordHistoryCollectionOptions = {
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         properties: {
//           email: {
//             bsonType: "string",
//             description: "Email address of the user.",
//           },
//           password: {
//             bsonType: "string",
//             description: "Password of the user.",
//           },
//           creationDate: {
//             bsonType: "date",
//             description: "Timestamp of when the password was created.",
//           },
//         },
//       },
//     },
//   };

//   db.createCollection("passwordHistory", passwordHistoryCollectionOptions);

//   console.log("Password history collection created successfully.");
// } catch (error) {
//   console.error("Error creating password history collection:", error);
//   throw error;
// }
