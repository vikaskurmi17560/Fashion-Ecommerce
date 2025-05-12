const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const WelcomeFormat = require("../email_templates/welcome"); // Ensure this file exports the HTML template as a string
dotenv.config();

// Configure the transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use secure: true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_KEY,
    },
    tls: {
        rejectUnauthorized: false, // For development; remove in production
    },
});

// Function to send the Welcome Email
exports.WelcomeEmail = async (email) => {
    const mailOptions = {
        from: '"E-commerce Team" <vkurmi307@gmail.com>', // Display name and email
        to: email,
        subject: "Welcome to E-commerce",
        text: "Hello and welcome to our e-commerce platform!", // Plain text body
        html: WelcomeFormat || "<p>Welcome to E-commerce! We're excited to have you.</p>", // Fallback HTML if template is unavailable
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
