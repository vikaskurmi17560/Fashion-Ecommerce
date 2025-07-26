const express = require("express");
const upload = require("../middlewares/multer");
const {
    signup,
    login,
    forgetPassword,
    resetPassword,
    getuserdata
} = require("../controllers/customer-controller");

const router = express.Router();

router.post("/signup", upload.single("profile"), signup);
router.post("/login", login);
router.post("/forgot", forgetPassword);
router.post("/reset-password", resetPassword);
router.get("/getdata", getuserdata);

module.exports = router;
