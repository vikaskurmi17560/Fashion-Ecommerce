import { useEffect, useState } from 'react';
import {
  CartDelete,
  GetCart,
  AddToCart,
  CartUpdateQuantity,
  ItemExists,
} from '../networks/cartnetworks';
import toast from 'react-hot-toast';
import useAuth from './useAuth';

function useCart() {
  const [carts, setCarts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      getCarts();
    } else {
      setCarts([]);
    }
  }, [user]);

  async function getCarts() {
    if (!user?._id) return;
    try {
      const response = await GetCart(user._id);
      if (response.success) {
        setCarts(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch carts:', error);
    }
  }

  async function deleteCart(id) {
    if (!user?._id) {
      toast.error('User not logged in');
      return;
    }
    try {
      const response = await CartDelete( id );
      if (response.success) {
        toast.success('Item Removed');
        await getCarts();
      }
    } catch (error) {
      toast.error('Failed to remove item');
      console.error(error);
    }
  }

  const updateCartQuantity = async (productId, change) => {
    if (!user?._id) {
      toast.error('User not logged in');
      return false;
    }

    try {
      const itemExists = await ItemExists(productId,user._id);
      const currentQty = itemExists.data?.quantity || 0;
      const newQty = currentQty + change;

      if (newQty < 1) {
        toast.error('Quantity cannot be less than 1');
        return false;
      }

      if (newQty > 5) {
        toast.error("You can't have more than 5 items");
        return false;
      }


      setCarts((prev) =>
        prev.map((item) =>
          item.product_id._id === productId
            ? {
              ...item,
              quantity: item.quantity + change,
              total_price: (item.product_id.sale_price ?? item.product_id.original_price ?? 0) * (item.quantity + change),
            }
            : item
        )
      );

      const updateResponse = await CartUpdateQuantity(productId,user._id,change);
      if (!updateResponse.success) {
        toast.error('Failed to update quantity');
        return false;
      }

      toast.success('Cart quantity updated');
      await getCarts();
      return true;
    } catch (err) {
      toast.error('Something went wrong');
      return false;
    }
  };

  async function AddCart(data) {
    if (!user?._id) {
      toast.error('User not logged in');
      return;
    }

    try {
      const body = {
        customer_id: user._id,
        product_id: data._id,
        quantity: 1,
        size: data.sizes?.[0]?.size || 'Default',
        color: data.colors?.[0] || 'Default',
        total_price: data.sale_price ?? data.original_price ?? 0,
      };

      const res = await AddToCart(body);

      if (res?.success) {
        toast.success('Added to cart');
        return;
      }

      if (res.message === 'cart is already here!') {
        const updateRes = await updateCartQuantity(data._id, +1);
        return;
      }
    } catch (error) {
      toast.error('An error occurred while adding to cart');
      return;
    }
  }

  return { AddCart, carts, getCarts, deleteCart, updateCartQuantity };
}

export default useCart;