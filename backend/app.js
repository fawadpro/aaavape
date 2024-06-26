const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const path = require("path");

const errorMiddleware = require("./middlewares/errors");
const user = require("./routes/user");
const order = require("./routes/order");
const User = require("./models/user");
const product = require("./routes/product");
const topMenu = require("./routes/topMenu");
const payment = require("./routes/payment");
const app = express();

if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "backend/config/config.env" });

bodyParser.urlencoded({ limit: "50mb", extended: true });
app.use(bodyParser.json({ limit: "50mb" }));

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://aaavape.herokuapp.com",
  "http://aaavape.herokuapp.com",
  "http://m.ruiywx.com",
];

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

// Route to confirm user account
app.get("/confirmation/:token", async (req, res) => {
  try {
    const {
      user: { id },
    } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    await User.update({ _id: id }, { $set: { isVerified: true } });
    if (process.env.NODE_ENV !== "production") {
      return res.redirect("http://localhost:3000/email-success");
    } else {
      return res.redirect(`/email-success`);
    }
  } catch (e) {
    res.send("error");
  }
});

// Route middlewares
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", topMenu);
app.use("/api/v1", payment);

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: "aaavape",
  api_key: "326354172469712",
  api_secret: "Cf5MiD06T7-vzG1nTBx65NiePwE",
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", function (req, res) {
    const index = path.join(__dirname, "../frontend/build/index.html");
    res.sendFile(index);
  });
}

// Error middlewares
app.use(errorMiddleware);

module.exports = app;
