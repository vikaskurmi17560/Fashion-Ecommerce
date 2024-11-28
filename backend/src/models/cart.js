//we need mongoose
const mongoose=require("mongoose");
//create schema 
const CartSchema=new mongoose.Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true,
    },
   product_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true,
   },
    total_price:{
     type:Number,
     required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    size:{
    type:String,
    required:true,
    },
}, { timestamps: true })
//create model
const Cart=mongoose.model("Cart",CartSchema);
//exports the model
module.exports=Cart;
