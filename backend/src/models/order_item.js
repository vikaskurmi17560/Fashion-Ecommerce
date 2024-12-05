//we need mongoose 
const mongoose = require("mongoose");
//create schema
const OrderItemSchema = new mongoose.Schema({
    order_id:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Order',
        required:true,
    },
    product_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true })
//create model
const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
//export model
module.exports = OrderItem;