const Customers = require("../models/customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const { WelcomeEmail } = require("../services/emails");
const { randomBytes, createHash } = require("crypto");
const { uploadSingleImage } = require("../services/cloudinary");



exports.signup = async (req, res) => {
  try {
    const { name, email, phone_no, password, confirm_password, gender } = req.body;

    if (!name || !email || !phone_no || !password || !confirm_password || !gender) {
      return res.status(400).json({ 
        success: false,
         message: "All fields are required" 
        });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
         message: "Password and confirm password must match"
         });
    }

    const existingUser = await Customers.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists" 
    });
    }

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Profile image is required"
     });
    }

    
    const uploadResponse = await uploadSingleImage(req.file.path);

    if (!uploadResponse) {
     
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ 
        success: false, 
        message: "Image upload failed"
     });
    }

    
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const profileUrl = uploadResponse.secure_url;

    const newCustomer = new Customers({
      profile: profileUrl,
      name,
      email,
      phone_no,
      password,
      confirm_password,
      gender
    });

    await newCustomer.save();
    WelcomeEmail(email);
    return res.status(201).json({ 
        success: true,
         message: "User registered successfully"
         });

  } catch (error) {
    return res.status(500).json({
         success: false,
          message: "Server error" 
        });
  }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const customerExists = await Customers.findOne({ email });
        if (!customerExists) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
        const isPasswordMatched = await bcrypt.compare(password, customerExists.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Password does not match"
            });
        }
        const payload = { email: customerExists.email, name: customerExists.name, _id: customerExists._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });
        return res.status(200).json({
            success: true,
            token,
            user: customerExists,
            message: "Login successful"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const customerExist = await Customers.findOne({ email });
        if (!customerExist) {
            return res.status(500).json({
                success: false,
                message: "Not Exists",
            });
        }
        const resetToken = randomBytes(32).toString("hex");
        customerExist.reset_password_token = createHash("sha256").update(resetToken).digest("hex");
        customerExist.reset_password_token_expire = Date.now() + 10 * 60 * 1000;
        await customerExist.save({ validateBeforeSave: false });
        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
        await sendEmail({
            email: customerExist.email,
            subject: "Password Reset Request",
            resetUrl,
        });
        return res.status(200).json({
            success: true,
            message: "reset password Successfully",
            resetUrl,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error",
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { password, confirm_password } = req.body;
        const hashToken = createHash("sha256").update(token).digest("hex");
        const customerExist = await Customers.findOne({
            reset_password_token: hashToken,
            reset_password_token_expire: { $gt: Date.now() }
        });
        if (!customerExist) {
            return res.status(500).json({
                success: false,
                message: "Token expire or not exists",
            });
        }
        customerExist.password = password;
        customerExist.confirm_password = confirm_password;
        customerExist.reset_password_token = undefined;
        customerExist.reset_password_token_expire = undefined;
        await customerExist.save();
        return res.status(200).json({
            success: true,
            message: "Reset Password Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error",
        });
    }
};

exports.getuserdata = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing user id in query string (?id=...).",
            });
        }
        const userExists = await Customers.findById(id);
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not Exists or not Exists"
            });
        }
        return res.status(200).json({
            success: true,
            message: "data get successfully",
            userExists
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "error",
        });
    }
};
