const express=require("express");
const upload=require("../middlewares/multer/multer");
const {signup,login, forgetPassword,resetPassword} = require("../controllers/customer-controller");
const router=express.Router();
router.post("/signup",upload.single("profile"),signup);
router.post("/login",login);
router.post("/forget",forgetPassword);
router.post("/reset-password",resetPassword);
module.exports=router;