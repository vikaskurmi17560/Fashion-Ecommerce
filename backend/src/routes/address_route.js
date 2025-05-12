const express=require("express");
const { createAddress, getAddress } = require("../controllers/address-controller");
const router=express.Router();

router.post("/create",createAddress);
router.get("/get",getAddress);


module.exports=router;