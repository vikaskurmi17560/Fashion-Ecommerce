'use client';

import { GetOrders } from '@/networks/ordernetworks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderDetailsProps {
  orderId: string;
  onClose: () => void;
}

export default function Orderdetails({ orderId, onClose }: OrderDetailsProps) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError(null);
      try {
        const response = await GetOrders(orderId);
        if (response.success) {
          setOrder(response.data);
        } else {
          setError(response.message || "Failed to fetch order.");
        }
      } catch (err: any) {
        setError("Something went wrong while fetching order details.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading order details...</p>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 font-medium">
        {error}
        <button
          onClick={onClose}
          className="block mt-4 mx-auto px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back
        </button>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="p-6 border rounded-lg shadow bg-gray-50 relative">
   
      <button
        onClick={onClose}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800 font-medium"
      >
        <span className="text-lg">←</span> Back
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Order #{order._id.slice(-6).toUpperCase()}
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Total:</strong> ₹{order.total}
        </p>
        <p>
          <strong>Payment ID:</strong> {order.payment_id.slice(0, 10)}
        </p>
        <p>
          <strong>Date:</strong>{' '}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>

       
        {order.items && order.items.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Items</h3>
            <ul className="space-y-2">
              {order.items.map((item: any, index: number) => (
                <li
                  key={index}
                  className="p-3 border rounded bg-white shadow-sm flex justify-between items-center"
                >
                  <div className="flex gap-3">
                    {item.product_id?.cover_image && (
                      <img
                        src={item.product_id.cover_image}
                        alt={item.product_id.name}
                         onClick={() => router.push(`/product?product_id=${item.product_id?._id}`)}
                        className="w-16 h-16 object-cover rounded cursor:pointer"
                      />
                    )}
                    <div>
                      <p className="font-medium">
                        {item.product_id?.name || 'Product'}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">₹{item.price}</p>
                  <button
                    onClick={() => router.push(`/product?product_id=${item.product_id?._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
