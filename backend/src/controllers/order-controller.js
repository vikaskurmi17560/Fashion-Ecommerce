const Orders=require("../models/order");
const OrderItems=require("../models/order_item");

exports.createOrder = async (req,res)=>{
    const {customer_id,payment_id,first_name,last_name,address,order_notes,phone_no,email,country,payment_method,total,products}=req.body();

   try{
      const order= await Orders.create({customer_id,payment_id,first_name,last_name,address,order_notes,phone_no,email,country,payment_method,total});
      const orderItem = products.map(async (product)=>{
                return await OrderItems.create({
                    order_id:order._id,
                    product_id:product.product_id,
                    quantity:product.quantity,
                    price:product.price}); 
      })
      await Promise.all(orderItem);
      return res.status(200).json({
        success:true,
        message:"Order and created successfully",
        data:order,
      })
   }
   catch(error){
      return res.status(500).json({
        success:false,
        message:error.message,
      })

   }

}