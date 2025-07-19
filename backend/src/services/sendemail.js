const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async ({ email, resetUrl }) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail", 
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_KEY, // Your email password or an app-specific password
        },
    });

    
    const mailOptions = {
        from: '"E-commerce Team" <vkurmi307@gmail.com>', 
        to: email,
        subject: "Reset Your Password",
        html: `
        <html>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                <table width="100%" bgcolor="#f4f4f4" style="padding: 20px;">
                    <tr>
                        <td>
                            <table align="center" width="600" style="background-color: #ffffff; padding: 20px; border-radius: 8px;">
                                <tr>
                                    <td style="text-align: center;">
                                        <h1 style="color: #333;">Password Reset Request</h1>
                                        <p style="color: #777;">We received a request to reset the password associated with your account. If you did not request a password reset, please ignore this email.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; padding: 10px 0;">
                                        <p style="color: #555;">
                                            To reset your password, click the button below. This link will expire in 10 minutes for your security.
                                        </p>
                                        <a href="${resetUrl}" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Reset Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; padding: 20px; color: #999;">
                                        <p>If you did not make this request, please ignore this email or contact our support team.</p>
                                        <p>Thank you,<br/> The E-commerce Team</p>
                                        <p>Need assistance? <a href="https://your-ecommerce-site.com/support" style="color: #007bff; text-decoration: none;">Contact Support</a></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;
