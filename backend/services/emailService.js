const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

const sendConfirmationEmail = (user, token, url) => {
  let localUrl = `http://${url}:5000/confirmation/${token}`;
  transport
    .sendMail({
      from: `AAAVape | Email Confirmation <fawad@aaavape.com>`,
      to: user.email,
      subject: "Confirmation Email",
      html: `<p>Your confirmation link is below — open it in your open browser window and we'll help you get signed in</p><br/>Link: <a href=${localUrl}>${localUrl}</a> `,
    })
    .then((res) => console.log("Email Sent"))
    .catch((error) => console.log(error));
};

exports.sendConfirmationEmail = sendConfirmationEmail;
