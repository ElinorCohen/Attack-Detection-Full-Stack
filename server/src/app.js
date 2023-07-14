const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const api = require("./api");
require("./models/Connection");
// require("./models/Schemas");

const app = express();

// view engine setup
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
