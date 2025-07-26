import { useEffect, useState } from 'react';
import { CartDelete, GetCart, AddToCart, CartUpdateQuantity, ItemExists } from '../networks/cartnetworks'
import toast from 'react-hot-toast';

function useCart() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getCarts();
  }, []);

  async function getCarts() {
    try {
      const response = await GetCart({});
      if (response.success) {
        setCarts(response.data);
      }
    } catch (error) {
      console.log('Error fetching carts:');
      return ;
    }
  }

  async function deleteCart(id) {
    try {
      const response = await CartDelete({ cart_id: id });
      if (response.success) {
        getCarts();
        toast.success("Item Removed")
      }
    } catch (error) {
      toast.success("Please wait...")
    }
  }

const updateCartQuantity = async (productId, change)=> {
  try {
    const user_id = localStorage.getItem("eco_user_id");
    if (!user_id) {
      toast.error("User not logged in");
      return false;  
    }

    const itemExists = await ItemExists(productId);
    const currentQty = itemExists.data?.quantity;
    const newQty = currentQty + change;

    if (newQty < 1) {
      toast.error("Quantity cannot be less than 1");
      return false;
    }

    if (newQty > 5) {
      toast.error("You can't have more than 5 items");
      return false;
    }

    await CartUpdateQuantity(productId, change);
    setCarts((prev) =>
      prev.map((item) =>
        item.product_id._id === productId
          ? {
              ...item,
              quantity: item.quantity + change,
              total_price: item.product_id.price * (item.quantity + change),
            }
          : item
      )
    );
    toast.success("Cart quantity updated");
    return true; 
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
    return false; 
  }
};



async function AddCart(data) {
  try {
    const user_id = localStorage.getItem("eco_user_id");
    if (!user_id) {
      toast.error("User not logged in");
      return;
    }

    const body = {
      customer_id: user_id,
      product_id: data._id,
      quantity: 1,
      size: data.sizes?.[0]?.size || "Default",
      color: data.colors?.[0] || "Default",
      total_price: data.sale_price,
    };

    const res = await AddToCart(body);

    if (res?.success) {
      toast.success("Added to cart");
      return;
    }

    if (res.message === "cart is already here!") {
      const updateRes = await updateCartQuantity(data._id, +1);
      return;
    }

  } catch (error) {
    toast.error("An error occurred while adding to cart");
    return;
  }
}


  return { AddCart, carts, getCarts, deleteCart, updateCartQuantity };
}

export default useCart;
