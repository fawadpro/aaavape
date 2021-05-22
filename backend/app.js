const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorMiddleware = require("./middlewares/errors");
const user = require("./routes/user");
const product = require("./routes/product");
const app = express();

bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

const whitelist = ["http://localhost:3000", "http://localhost:3001"];

const corsOptions = {
  origin(origin, callback) {
    console.log(
      "---------------------------------\n origin: ",
      origin,
      "\n---------------------------------"
    );
    if (
      whitelist.indexOf(origin) !== -1 ||
      !origin ||
      (app.get("env") === "development" &&
        (origin.indexOf("192.168") >= 0 || origin === "null")) ||
      origin === "null"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Route middlewares
app.use("/api/v1", user);
app.use("/api/v1", product);

// Error middlewares
app.use(errorMiddleware);

module.exports = app;
