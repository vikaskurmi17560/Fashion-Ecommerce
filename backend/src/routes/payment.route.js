const express= require("express");
const { createOrder } = require("../controllers/payment-controller");
const Router=express.Router();
Router.post("/create-order",createOrder);
module.exports=Router