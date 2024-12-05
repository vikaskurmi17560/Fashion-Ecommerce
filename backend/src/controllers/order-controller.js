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
exports.getOrder = async (req,res)=>{

   const{order_id}=req.body
   try{
      const order= await Orders.find({order_id});
      
      return res.status(200).json({
        success:true,
        message:"Order fetch successfully",
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

exports.getOrder = async (req, res) => {
   const { order_id } = req.params; // Use route parameter
 
   try {
     // Fetch the order by its ID
     const order = await Orders.findById(order_id);
 
     if (!order) {
       return res.status(404).json({
         success: false,
         message: "Order not found",
       });
     }
 
     // Fetch related order items
     const orderItems = await OrderItems.find({ order_id: order._id });
 
     return res.status(200).json({
       success: true,
       message: "Order fetched successfully",
       data: {
         order,
         orderItems,
       },
     });
   } catch (error) {
     return res.status(500).json({
       success: false,
       message: error.message,
     });
   }
 };