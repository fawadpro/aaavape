const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

const sendResetEmail = (email, message) => {
  let localUrl = message;

  transport
    .sendMail({
      from: `AAAVape | Reset Password <fawad@aaavape.com>`,
      to: email,
      subject: "Please reset your password",
      html: localUrl,
    })
    .then((res) => console.log("Email Sent"))
    .catch((error) => console.log(error));
};

exports.sendResetEmail = sendResetEmail;
