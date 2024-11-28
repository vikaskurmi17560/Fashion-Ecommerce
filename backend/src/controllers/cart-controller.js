const Carts = require("../models/cart");

//------------------------------------------cart create--------------------------------------------------------------------------------------------
exports.cartCreate = async (req, res) => {
    const { customer_id, product_id, total_price, quantity, color, size ,name,image} = req.body;

    try {

        const cartExists = await Carts.findOne({ product_id, customer_id });
        if (cartExists) {
            return res.status(400).json({
                success: true,
                message: "cart is already here!"
            });
        }

        const cart = await Carts.create({ customer_id, product_id, total_price, quantity, color, size , name ,image });

        return res.status(200).json({
            success: true,
            message: res.message,
            data: cart,
        });
    }
    catch (error) {
        console.log("create cart error:",error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
    
}
// --------------------------------Cart get-------------------------------------------------------------------------
exports.cartGet= async (req,res)=>{
  
    const{customer_id}=req.query;

    try{
        const CartExists= await Carts.find({customer_id:customer_id}).populate("product_id");

        if(CartExists){
           return res.status(200).json({
            success:true,
            message:res.message,
            data:CartExists,
           })
        }
        return res.status(200).json({
            success:false,
            message:"Error in data fetching"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
//------------------------------------------cart update------------------------------------------------------------------------------------
exports.cartUpdate = async (req, res) => {

    const { cart_id } = req.query;


    const { total_price, quantity, color, size } = req.body;

    const update_object = {};
    if (total_price) {
        update_object.total_price = total_price;
    }
    if (quantity) {
        update_object.quantity = quantity;
    }
    if (color) {
        update_object.color = color;
    }
    if (size) {
        update_object.size = size;
    }

    try {
        const updatedcart = await findByIdAndUpdate(cart_id, update_object, { new: true, });
        return res.status(200).json({
            success: true,
            message: "Cart update Successfully",
            data: updatedcart,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "error in update carts",
        })
    }
}
//-----------------------------------------------cart Delete-----------------------------------------------------------------------------
exports.cartDelete = async (req,res)=>{
    const {cart_id}=req.query;

    try{
        await Carts.findByIdAndDelete(cart_id);
       return res.status(200).json({
        success:true,
        message:"cart Delete Successfully",
       });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cart_id in invalid or other error in delete cart function",
        })
    }
}