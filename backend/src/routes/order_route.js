const express=require("express");
const { createOrder, getOrder, getAllOrder } = require("../controllers/order-controller");
const router=express.Router();
router.post("/create",createOrder);
router.get("/get",getOrder);
router.get("/getall",getAllOrder);
module.exports=router;