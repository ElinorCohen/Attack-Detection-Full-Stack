const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

try {
  const userName = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const connectionString = `mongodb+srv://${userName}:${password}@atackometer.kqmzby9.mongodb.net/`;
  mongoose.connect(connectionString, { useNewUrlParser: true });
  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to the database");
  });

  module.exports = db;
} catch (error) {
  console.log(error);
}
