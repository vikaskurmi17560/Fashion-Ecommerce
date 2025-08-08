const express = require("express");
const upload = require("../middlewares/multer");
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  getuserdata,
  logout
} = require("../controllers/customer-controller");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", upload.single("profile"), signup);
router.post("/login", login);
router.post("/forgot", forgetPassword);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);
router.get("/getdata",authMiddleware, getuserdata);

module.exports = router;
