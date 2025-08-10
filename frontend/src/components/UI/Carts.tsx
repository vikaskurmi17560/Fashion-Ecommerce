'use client';

import React, { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import useCart from '@/hook/useCart';
import useAuth from '@/hook/useAuth';

interface CartProductRef {
  _id: string;
  cover_image: string;
  name: string;
  sale_price?: number;
  original_price?: number;
}

interface CartLine {
  _id: string;
  product_id: CartProductRef;
  quantity: number;
}

interface Props {
  onCheckout?: (subtotal: number) => void;
}

export default function Carts({ onCheckout }: Props) {
  const { user } = useAuth() as { user: { _id: string } | null };
  const [mounted, setMounted] = useState(false);
  const { carts, updateCartQuantity, deleteCart } = useCart();
  const [localCarts, setLocalCarts] = useState<CartLine[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user && carts) {
      setLocalCarts(carts);
    }
  }, [carts, mounted, user]);


  if (!user) {
    return (
      <div className="w-full text-center py-10 text-gray-600 font-semibold">
        Please log in to view your cart.
      </div>
    );
  }

  const subtotal = localCarts.reduce((acc, item) => {
    const product = item.product_id as any;
    const price =
      typeof product.sale_price === 'number'
        ? product.sale_price
        : typeof product.original_price === 'number'
          ? product.original_price
          : 0;
    return acc + price * item.quantity;
  }, 0);

  const handleQuantityChange = async (productId: string, change: number) => {
    try {
      const updated = await updateCartQuantity(productId, change);
      if (updated) {
        setLocalCarts((prev) =>
          prev.map((item) =>
            item.product_id._id === productId
              ? { ...item, quantity: item.quantity + change }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Quantity update failed:', error);
    }
  };

 const handleDelete = async (cartLineId: string) => {
  try {
    await deleteCart(cartLineId); 
    setLocalCarts((prev) => prev.filter((item) => item._id !== cartLineId));
  } catch (error) {
    console.error('Delete cart item failed:', error);
  }
};


  if (!mounted) return null;

  if (localCarts.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500 font-semibold">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-slate-700 font-extrabold text-center text-3xl md:text-5xl lg:text-7xl mb-6">
        Cart
      </h1>

      <div className="w-full max-w-7xl mx-auto bg-white rounded-md shadow overflow-x-auto border border-slate-300">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 text-center text-sm md:text-base font-bold bg-slate-200 py-3 px-2 border-b border-slate-300">
          <div>Remove</div>
          <div>Image</div>
          <div className="hidden sm:block">Name</div>
          <div className="hidden lg:block">Price</div>
          <div>Qty</div>
          <div>Subtotal</div>
        </div>

        {localCarts.map((cart) => {
          const product = cart.product_id as any;
          const price =
            typeof product.sale_price === 'number'
              ? product.sale_price
              : typeof product.original_price === 'number'
                ? product.original_price
                : 0;
          const itemSubtotal = price * cart.quantity;

          return (
            <div
              key={cart._id}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 items-center text-center text-sm md:text-base py-4 px-2 border-b border-slate-200 bg-slate-50"
            >
              <button
                type="button"
                onClick={() => handleDelete(cart._id)}
                className="cursor-pointer text-red-500 mx-auto"
                aria-label="Remove item"
              >
                <CancelIcon />
              </button>

              <img
                src={product.cover_image}
                alt={product.name || 'Product'}
                className="w-20 h-20 object-contain mx-auto rounded-md"
              />

              <div className="hidden sm:block">{product.name}</div>

              <div className="hidden lg:block text-slate-600">
                ₹{price.toFixed(2)}
              </div>

              <div className="flex items-center justify-center gap-2 mx-auto">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(product._id, -1)}
                  className="px-2 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50"
                  disabled={cart.quantity <= 1}
                >
                  -
                </button>

                <span className="w-6 text-center">{cart.quantity}</span>

                <button
                  type="button"
                  onClick={() => handleQuantityChange(product._id, 1)}
                  className="px-2 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50"
                  disabled={cart.quantity >= 5}
                >
                  +
                </button>
              </div>

              <div className="text-slate-600">₹{itemSubtotal.toFixed(2)}</div>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-7xl px-4 pb-10 mx-auto mt-8 text-black">
        <div className="flex justify-end">
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-slate-300 rounded-lg bg-white shadow-md p-4 space-y-4">
            <h2 className="text-2xl font-bold text-slate-700 border-b pb-2">
              Cart Total
            </h2>
            <div className="flex justify-between text-lg border p-2 rounded-md">
              <span className="font-semibold">Subtotal</span>
              <span className="text-slate-600">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg border p-2 rounded-md">
              <span className="font-semibold">Total</span>
              <span className="text-slate-600">₹{subtotal.toFixed(2)}</span>
            </div>

            {onCheckout && (
              <button
                onClick={() => onCheckout(subtotal)}
                className="w-full py-3 text-xl font-bold text-white bg-blue-600 hover:bg-black transition rounded"
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}