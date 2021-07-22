const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require("cloudinary");

const errorMiddleware = require("./middlewares/errors");
const user = require("./routes/user");
const order = require("./routes/order");
const product = require("./routes/product");
const topMenu = require("./routes/topMenu");
const app = express();

bodyParser.urlencoded({ limit: "50mb", extended: true });
app.use(bodyParser.json({ limit: "50mb" }));

console.log("@@@ data", process.env.CLOUDINARY_API_SECRET);

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
app.use("/api/v1", order);
app.use("/api/v1", topMenu);

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: "aaavape",
  api_key: "326354172469712",
  api_secret: "Cf5MiD06T7-vzG1nTBx65NiePwE",
});

// Error middlewares
app.use(errorMiddleware);

module.exports = app;
