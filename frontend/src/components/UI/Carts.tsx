'use client';
import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';


export interface CartProductRef {
  cover_image: string;
  name: string;
}

export interface CartLine {
  _id: string;
  product_id: CartProductRef;
  total_price: number;
  quantity: number;
}

export interface CartProps {
  carts: CartLine[] | undefined | null;
  onRemove?: (id: string) => void;
  onCheckout?: (subtotal: number) => void;
  currency?: string; 
}

export default function Carts({
  carts,
  onRemove,
  onCheckout,
  currency = '₹',
}: CartProps) {
  const subtotal =
    carts?.reduce(
      (acc, item) => acc + (item.total_price ?? 0) * (item.quantity ?? 0),
      0
    ) ?? 0;

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

        {carts && carts.length > 0 ? (
          carts.map((cart) => (
            <div
              key={cart._id}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 items-center text-center text-sm md:text-base py-4 px-2 border-b border-slate-200 bg-slate-50"
            >
              <button
                type="button"
                onClick={() => onRemove?.(cart._id)}
                className="cursor-pointer text-red-500 mx-auto"
                aria-label="Remove item"
              >
                <CancelIcon />
              </button>

              <img
                src={cart.product_id.cover_image}
                alt={cart.product_id.name || 'Product'}
                className="w-20 h-20 object-contain mx-auto rounded-md"
              />

              <div className="hidden sm:block">{cart.product_id.name}</div>

              <div className="hidden lg:block text-slate-600">
                {currency}
                {cart.total_price?.toFixed(2)}
              </div>

              <div>{cart.quantity}</div>

              <div className="text-slate-600">
                {currency}
                {(cart.total_price * cart.quantity).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-500 font-semibold">
            Your cart is empty.
          </div>
        )}
      </div>

      <div className="w-full max-w-7xl px-4 pb-10 mx-auto mt-8 text-black">
        <div className="flex justify-end">
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-slate-300 rounded-lg bg-white shadow-md p-4 space-y-4">
            <h2 className="text-2xl font-bold text-slate-700 border-b pb-2">
              Cart Total
            </h2>
            <div className="flex justify-between text-lg border p-2 rounded-md">
              <span className="font-semibold">Subtotal</span>
              <span className="text-slate-600">
                {currency}
                {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-lg border p-2 rounded-md">
              <span className="font-semibold">Total</span>
              <span className="text-slate-600">
                {currency}
                {subtotal.toFixed(2)}
              </span>
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
