const nodemailer = require("nodemailer");
const {EMAIL_USER, EMAIL_PASS} = process.env
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL for 465, false for other ports
  auth: {
    user: EMAIL_USER, // generated ethereal user
    pass: EMAIL_PASS, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("Readt for send emails");
});

module.exports = transporter;
