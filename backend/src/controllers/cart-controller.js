const Carts = require("../models/cart");

//------------------------------------------cart create--------------------------------------------------------------------------------------------
exports.cartCreate = async (req, res) => {
    const { customer_id, product_id, total_price, quantity, color, size, name, image } = req.body;

    try {

        const cartExists = await Carts.findOne({ product_id, customer_id });
        if (cartExists) {
            return res.status(201).json({
                success: false,
                message: "cart is already here!"
            });
        }

        const cart = await Carts.create({ customer_id, product_id, total_price, quantity, color, size, name, image });

        return res.status(200).json({
            success: true,
            message: res.message,
            data: cart,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}
// --------------------------------Cart get-------------------------------------------------------------------------
exports.cartGet = async (req, res) => {

    const { customer_id } = req.query;

    try {
        const CartExists = await Carts.find({ customer_id: customer_id }).populate("product_id");

        if (CartExists) {
            return res.status(200).json({
                success: true,
                message: res.message,
                data: CartExists,
            })
        }
        return res.status(200).json({
            success: false,
            message: "Error in data fetching"
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
//------------------------------------------cart update------------------------------------------------------------------------------------
exports.cartUpdate = async (req, res) => {
  const { item_id, user_id } = req.query;
  const { quantity } = req.body;

  try {
    const quantitySchema = Carts.schema.path('quantity');
    const maxQuantity = quantitySchema.options.max;

    const existingCart = await Carts.findOne({ product_id: item_id, customer_id: user_id });

    if (!existingCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const newQuantity = existingCart.quantity + quantity;

    if (newQuantity > maxQuantity) {
      return res.status(400).json({
        success: false,
        message: `Quantity must not exceed ${maxQuantity}`,
      });
    }

    const updatedCart = await Carts.findOneAndUpdate(
      { product_id: item_id, customer_id: user_id },
      { $inc: { quantity } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
};
//-----------------------------------------------exists item-------------------------------------------------------------------------------
exports.ItemExists = async (req, res) => {
  try {
    const { product_id, user_id } = req.query;

    if (!product_id || !user_id) {
      return res.status(400).json({ success: false, message: "Missing product_id or user_id" });
    }

    const item = await Carts.findOne({
      product_id: product_id,
      customer_id: user_id
    });

    if (item) {
      return res.status(200).json({ success: true, exists: true, data: item });
    } else {
      return res.status(404).json({ success: false, exists: false });
    }
  } catch (error) {
    console.error("Error checking item existence:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


//-----------------------------------------------cart Delete-----------------------------------------------------------------------------
exports.cartDelete = async (req, res) => {
    const { cart_id } = req.query;

    try {
        await Carts.findByIdAndDelete(cart_id);
        return res.status(200).json({
            success: true,
            message: "cart Delete Successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "cart_id in invalid or other error in delete cart function",
        })
    }
}

exports.cartDeletebyUser = async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: "user_id is required in query params",
        });
    }

    try {
        const result = await Carts.deleteMany({ customer_id: user_id });

        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} cart item(s) deleted successfully.`,
        });
    } catch (error) {
        console.error("Delete cart error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete cart items. Internal server error.",
        });
    }
};