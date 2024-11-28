//we need mongoose
const mongoose=require("mongoose");
//create Schema
const OrderSchema= new mongoose.Schema({
customer_id:{
  Type:mongoose.Schema.Types.ObjectId,
  ref:'customer',
  required:true,
},
payment_id:{
    type:String,
    required:true,
},
total:{
    type:Number,
    required:true,
},
first_name:{
    type:String,
    required:true,
},
last_name:{
    type:String,
    required:true,
},
country:{
    type:String,
    required:true,
},
phone_no:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
order_notes:{
    type:String,
    required:true,
},
address:{
    type:String,
    required:true,
},
payment_method:{
    type:String,
    required:true,
},

}, { timestamps: true })
//create model
const Order=mongoose.model("Order",OrderSchema);
//exports model
module.exports=Order;