const nodemailer = require("nodemailer");
const dotenv=require("dotenv");
const WelcomeFormate=require("../email_templates/welcome");
dotenv.config();
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_KEY,
    },
    ignoreTLS: true
})
exports.WelcomeEmail = async (email) => {
    const MailOption = {
        from: "<vkurmi307@gmail.com>",
        to: email,
        subject: "Welcome to E-commerce",
        text:"hello"
        // html:WelcomeFormate,
    }
    transporter.sendMail(MailOption)
        .then((info) => {
            return info;
        }).catch((error) => {
            console.log(error);
            return error;
        })
}


