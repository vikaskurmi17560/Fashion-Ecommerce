const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors")
const app=express();
const customer_route=require("./src/routes/customer.route")
const product_route=require("./src/routes/product.route")
const cart_route=require("./src/routes/cart.route")
const payment_route=require("./src/routes/payment.route")
const address_route=require("./src/routes/address.route")
const order_route=require("./src/routes/order-route")
app.use(cors());

app.use(express.json());
dotenv.config();
app.use('/api/v1/customer',customer_route);
app.use('/api/v1/product',product_route);
app.use('/api/v1/cart',cart_route);
app.use('/api/v1/payment',payment_route)
app.use('/api/v1/address',address_route)
app.use(`/api/v1/order`,order_route)
module.exports={app};