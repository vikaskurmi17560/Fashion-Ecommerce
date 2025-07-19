const Customers = require("../models/customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { WelcomeEmail } = require("../services/emails");
const { randomBytes, createHash } = require("crypto");
const { uploadSingleImage } = require("../services/cloudinary");


exports.signup = async (req, res) => {
    
    const { name, email, phone_no, password, confirm_password, gender } = req.body;
    let profileImage=null;
    if(req.file){
        const uploadedImage =  await uploadSingleImage(req.file.path);
        if(uploadedImage){
            console.log(uploadedImage);
           profileImage=uploadedImage.secure_url
        }
    }
        console.log(req.file);
    

    try {
       
        const customerExists = await Customers.findOne({ email });
        if (customerExists) {
            return res.status(400).json({
                success: true,
                message: "User created"
            });
        }
        console.log(req.body);
       
        const newCustomer = await Customers.create({
            profile:profileImage,
            name,
            email,
            phone_no,
            password: password,
            confirm_password: confirm_password,  
            gender,
        });
        await WelcomeEmail(email);
        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (err) {
        console.log(err);
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
            user:customerExists,
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
            })
        }
        //create reset_password token
        const resetToken = randomBytes(32).toString("hex");
        //create hash
        customerExist.reset_password_token = createHash("sha256").update(resetToken).digest("hex");
        customerExist.reset_password_token_expire = Date.now() + 10 * 60 * 1000
        //save in database
        await customerExist.save({
            validateBeforeSave: false
        })

        //generate a link
        // const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/customer/reset-password?token=${resetToken}`
        const resetUrl=`http://localhost:3000/reset-password?token=${resetToken}`
        //send the link in email
         await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            resetUrl,
        });
        return res.status(200).json({
            success: true,
            message: "reset password Successfully",
            resetUrl,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error",
        });
    }
}


exports.resetPassword = async (req, res) => {

    
    try {
        const { token } = req.query;
        const {password,confirm_password}=req.body;
        const hashToken = createHash("sha256").update(token).digest("hex");
        const customerExist = await Customers.findOne({ 
            reset_password_token: hashToken,
             reset_password_token_expire : { $gt: Date.now() } 
            });
       
     if(!customerExist){
        return res.status(500).json({
            success: false,
            message: "Token expire or not exists",
        });
     }
     
     customerExist.password=password;
     customerExist.confirm_password=confirm_password;
     customerExist.reset_password_token=undefined;
     customerExist.reset_password_token_expire=undefined;
     await customerExist.save();
       return res.status(200).json({
        success:true,
        message:"Reset Password Successfully",
       })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error",
        });
    }
}

