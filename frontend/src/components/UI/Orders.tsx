'use client';
import { GetALLOrders } from '@/networks/ordernetworks';
import React, { useEffect, useState } from 'react';
import OrderDetails from './Orderdetails';
import useAuth from '@/hook/useAuth';

interface User {
  _id: string;
}

function Orders() {
  const [orderData, setOrderData] = useState<any>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { user } = useAuth() as { user: User | null };

  async function fetchdata() {
    if (!user) return;

    try {
      const orders = await GetALLOrders(user._id);
      if (orders.success) {
        setOrderData(orders.ALLorder);
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.error('Orders fetch error:', error);
      setOrderData([]);
    }
  }

  useEffect(() => {
    fetchdata();
  }, [user]);

  if (!user) {
    return (
      <p className="text-center p-4 text-gray-600 font-semibold">
        Please log in to see your orders.
      </p>
    );
  }

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md min-h-[200px]">
      {selectedOrderId ? (
        <OrderDetails orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />
      ) : orderData && orderData.length > 0 ? (
        <div className="space-y-6">
          {orderData.map((order: any) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Order #{order._id.slice(-6)}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start">
                  <span className="min-w-[80px] font-semibold text-gray-700 shrink-0">Customer:</span>
                  <span className="text-gray-600">
                    {order.customer_name ?? 'N/A'}
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="min-w-[80px] font-semibold text-gray-700 shrink-0">Address:</span>
                  <span className="text-gray-600">
                    {order.address ?? 'N/A'}
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="min-w-[80px] font-semibold text-gray-700 shrink-0">Payment ID:</span>
                  <span className="text-gray-600">{order.payment_id ?? 'N/A'}</span>
                </div>

                <div className="flex items-start">
                  <span className="min-w-[80px] font-semibold text-gray-700 shrink-0">Date:</span>
                  <span className="text-gray-600">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="min-w-[80px] font-semibold text-gray-700 shrink-0">Items:</span>
                  <span className="text-gray-600">{order.items?.length ?? 0}</span>
                </div>

                <div className="flex items-start">
                  <span className="min-w-[80px] font-semibold text-gray-700 shrink-0">Total:</span>
                  <span className="text-gray-600 font-bold text-lg">₹{order.total ?? 0}</span>
                </div>

                <div className="flex items-start md:col-span-2">
                  <span className="min-w-[80px] font-semibold text-gray-700 shrink-0">Status:</span>
                  <span className="text-green-600 font-medium">Success</span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setSelectedOrderId(order._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm transition duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No orders found.</p>
      )}
    </div>
  );
}

export default Orders;