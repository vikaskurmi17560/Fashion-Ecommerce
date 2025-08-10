const express=require("express");
const { createAddress, getAddress, deleteAddress } = require("../controllers/address-controller");
const authMiddleware = require("../middlewares/auth");
const router=express.Router();

router.post("/",authMiddleware,createAddress);
router.get("/",authMiddleware,getAddress);
router.delete("/",authMiddleware,deleteAddress);


module.exports=router;