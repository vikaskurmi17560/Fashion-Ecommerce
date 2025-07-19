const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const WelcomeFormat = require("../email_templates/welcome"); 
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_KEY,
    },
    tls: {
        rejectUnauthorized: false, 
    },
});

exports.WelcomeEmail = async (email) => {
    const mailOptions = {
        from: '"E-commerce Team" <vkurmi307@gmail.com>',
        to: email,
        subject: "Welcome to E-commerce",
        text: "Hello and welcome to our e-commerce platform!", 
        html: WelcomeFormat || "<p>Welcome to E-commerce! We're excited to have you.</p>",
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        return { success: true, info };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};
