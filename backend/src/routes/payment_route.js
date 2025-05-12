const express= require("express");
const { createOrder,verifyPayment } = require("../controllers/payment-controller");
const Router=express.Router();
Router.post("/create-order",createOrder);
Router.post("/verify-payment",verifyPayment);
module.exports=Router