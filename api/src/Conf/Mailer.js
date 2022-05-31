const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL for 465, false for other ports
  auth: {
    user: "lavalalexander@gmail.com", // generated ethereal user
    pass: "pyfjnjcqygdjpztw", // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("Readt for send emails");
});

module.exports = transporter;
