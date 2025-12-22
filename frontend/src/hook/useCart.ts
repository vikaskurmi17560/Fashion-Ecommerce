'use client'
import { useEffect, useState, useCallback } from 'react';
import { useHelpStore } from '@/service/help';
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
  const [carts, setCarts] = useState<any[]>([]);
  const { user } = useAuth() as { user: { _id?: string } | null };
  const { setCount } = useHelpStore();

  const getCarts = useCallback(async () => {
    if (!user?._id) return;
    try {
      const response = await GetCart(user._id);
      if (response.success) {
        setCarts(response.data);
        setCount(response.data.length);
      }
    } catch (error) {
      console.error('Failed to fetch carts:', error);
    }
  }, [user, setCount]);

  useEffect(() => {
    if (user?._id) {
      getCarts();
    } else {
      setCarts([]);
      setCount(0);
    }
  }, [user, getCarts, setCount]);

  async function deleteCart(id: string) {
    if (!user?._id) {
      toast.error('User not logged in');
      return;
    }
    try {
      const response = await CartDelete(id);
      if (response.success) {
        toast.success('Item Removed');
        await getCarts();
      }
    } catch (error) {
      toast.error('Failed to remove item');
      console.error(error);
    }
  }

  const updateCartQuantity = async (productId: string, change: boolean) => {
    if (!user?._id) {
      toast.error('User not logged in');
      return false;
    }

    try {
      const itemExists = await ItemExists(productId, user._id);
      if (!itemExists?.success) {
        toast.error('Item not found in cart');
        return false;
      }
  
      const delta = change ? 1 : -1;
      const newQty = itemExists.data.quantity + delta;

      if (newQty < 1) {
        toast.error('Quantity cannot be less than 1');
        return false;
      }

      if (newQty > 5) {
        toast.error("You can't have more than 5 items");
        return false;
      }

      // Optimistic update
      setCarts((prev) =>
        prev.map((item) =>
          item.product_id._id === productId
            ? {
                ...item,
                quantity: item.quantity + delta,
                total_price:
                  (item.product_id.sale_price ?? item.product_id.original_price ?? 0) *
                  (item.quantity + delta),
              }
            : item
        )
      );

      const updateResponse = await CartUpdateQuantity(productId, user._id, delta);
      if (!updateResponse.success) {
        toast.error('Failed to update quantity');
        await getCarts(); // revert to server state
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

  async function AddCart(data: any) {
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
        await getCarts();
        return;
      }

      if (res?.message === 'cart is already here!') {
        // Increase by 1 when item already exists
        await updateCartQuantity(data._id, true);
        return;
      }

      toast.error(res?.message || 'Failed to add to cart');
    } catch (error) {
      toast.error('An error occurred while adding to cart');
      console.error(error);
    }
  }

  return { AddCart, carts, getCarts, deleteCart, updateCartQuantity };
}

export default useCart;