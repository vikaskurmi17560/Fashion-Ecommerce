const express = require("express");
const upload = require("../middlewares/multer");
const authMiddleware = require("../middlewares/auth");

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  getuserdata,
  logout,
  checkAuth,
  updateUser
} = require("../controllers/customer-controller");

const router = express.Router();

router.post("/signup", upload.single("profile"), signup);
router.post("/login", login);
router.post("/forgot", forgetPassword);
router.post("/logout", authMiddleware, logout);
router.post("/reset-password", resetPassword);
router.get("/getdata", authMiddleware, getuserdata);
router.get("/check-auth", authMiddleware, checkAuth);
router.patch("/update", authMiddleware, upload.single("profile"), updateUser);

module.exports = router;