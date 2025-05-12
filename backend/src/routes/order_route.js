const express=require("express");
const { createOrder, getOrder } = require("../controllers/order-controller");
const router=express.Router();
router.post("/create",createOrder);
router.get("/get",getOrder);
module.exports=router;