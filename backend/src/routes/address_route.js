const express=require("express");
const { createAddress, getAddress, deleteAddress } = require("../controllers/address-controller");
const router=express.Router();

router.post("/create",createAddress);
router.get("/get",getAddress);
router.delete("/delete",deleteAddress);


module.exports=router;