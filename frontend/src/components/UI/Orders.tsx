'use client';
import { GetALLOrders } from '@/networks/ordernetworks';
import React, { useEffect, useState } from 'react';
import OrderDetails from './Orderdetails'; 

function Orders() {
  const [orderData, setOrderData] = useState<any>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  async function fetchdata() {
    try {
      const orders = await GetALLOrders();
      if (orders.success) {
        console.log('orders:', orders);
        setOrderData(orders.ALLorder);
      }
    } catch (error) {
      console.error('orders fetch error:', error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
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
                  <span className="w-32 font-semibold text-gray-700">Customer:</span>
                  <span className="text-gray-600">
                    {order.address.firstname} {order.address.lastname}
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="w-32 font-semibold text-gray-700">Address:</span>
                  <span className="text-gray-600">
                    {order.address.street}, {order.address.city}, {order.address.state} -{' '}
                    {order.address.pincode}
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="w-32 font-semibold text-gray-700">Payment ID:</span>
                  <span className="text-gray-600">{order.payment_id}</span>
                </div>

                <div className="flex items-start">
                  <span className="w-32 font-semibold text-gray-700">Date:</span>
                  <span className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="w-32 font-semibold text-gray-700">Items:</span>
                  <span className="text-gray-600">{order.items?.length ?? 0}</span>
                </div>

                <div className="flex items-start">
                  <span className="w-32 font-semibold text-gray-700">Total:</span>
                  <span className="text-gray-600 font-bold text-lg">₹{order.total ?? 0}</span>
                </div>

                <div className="flex items-start md:col-span-2">
                  <span className="w-32 font-semibold text-gray-700">Status:</span>
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
