const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors")
const app=express();
const customer_route=require("./src/routes/customer.route")
const product_route=require("./src/routes/product.route")
const cart_route=require("./src/routes/cart.route")
const payment_route=require("./src/routes/payment.route")
app.use(cors());

app.use(express.json());
dotenv.config();
app.use('/api/v1/customer',customer_route);
app.use('/api/v1/product',product_route);
app.use('/api/v1/cart',cart_route);
app.use('/api/v1/payment',payment_route)
module.exports={app};