const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const VERFMAIL = process.env.VERF_EMAIL;
const VERFPASS = process.env.VERF_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: VERFMAIL,
    pass: VERFPASS,
  },
});


module.exports = {transporter}