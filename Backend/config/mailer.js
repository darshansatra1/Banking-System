const nodemailer = require("nodemailer");

let config = {
    service:"gmail",
    auth:{
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
    }
}

let transporter = nodemailer.createTransport(config);

module.exports = transporter;