const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/errors");
const user = require("./routes/user");
const app = express();

bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

// Route middlewares
app.use("/api/v1", user);

// Error middlewares
app.use(errorMiddleware);

module.exports = app;
