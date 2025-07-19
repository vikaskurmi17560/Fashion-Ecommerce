'use client';

import { useEffect, useState, FormEvent } from 'react';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleCheckout } from '@/networks/paymentnetworks';
import { DeleteAddress, GetAddress } from '@/networks/addressnetworks';
import useCart from '@/hook/useCart';
import toast from 'react-hot-toast';

interface AddressType {
  _id: string;
  customer_id: string;
  firstname: string;
  lastname: string;
  country: string;
  city: string;
  state: string;
  pincode: string;
  street: string;
}

function CheckoutPage() {
  const [login, setLogin] = useState(false);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const { carts } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const subtotalString = localStorage.getItem('checkout_subtotal');
      if (subtotalString) setTotalPrice(parseFloat(subtotalString));

      const id = localStorage.getItem('user_id');
      if (id) {
        setLogin(true);
        getAddress(id);
      } else {
        setLogin(false);
        router.replace('/login');
      }
    }
  }, []);

  const getAddress = async (id: string) => {
    try {
      const response = await GetAddress(id);
      if (response.success && Array.isArray(response.data)) {
        setAddresses(response.data);
        if (response.data.length > 0) setSelectedAddressId(response.data[0]._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await DeleteAddress(id);
      toast.success('Address removed successfully');
      const userId = localStorage.getItem('user_id');
      if (userId) getAddress(userId);
    } catch (err) {
      console.error(err);
      toast.error('Error deleting address');
    }
  };

  const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedAddressId) return toast.error('Please select a delivery address');
    if (!selectedPayment) return toast.error('Please select a payment method');

    try {
      await handleCheckout(totalPrice*100, router, selectedAddressId, carts);
    } catch (err) {
      toast.error('Payment failed. Try again.');
    }
  };

  return (
    <main className="w-full min-h-screen bg-white text-black flex flex-col items-center">
      <Navbar />

      <section className="w-full bg-slate-100 py-10 px-4 md:px-10 text-slate-800">
        <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto flex flex-col gap-10">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-slate-700">Checkout</h1>

          <div className="flex items-center gap-2 border-t pt-4 text-sm text-black">
            <OpenInBrowserIcon className="text-gray-600" />
            <span className="text-gray-500">Have a coupon?</span>
            <button type="button" className="text-blue-600 hover:underline">Click here to enter your code</button>
          </div>

          {/* Address Section */}
          <section className="w-full bg-white p-4 rounded shadow text-slate-800">
            <h2 className="text-lg font-semibold mb-4">Select Delivery Address</h2>
            <div className="flex flex-col gap-4 mb-4">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div key={address._id} className="flex justify-between items-start bg-slate-50 p-3 rounded shadow">
                    <label className="flex flex-row items-start gap-3 text-sm md:text-base cursor-pointer w-full">
                      <input
                        type="radio"
                        name="address"
                        value={address._id}
                        checked={selectedAddressId === address._id}
                        onChange={() => setSelectedAddressId(address._id)}
                        className="mt-1"
                      />
                      <p className="flex-1">
                        <strong>{address.firstname} {address.lastname}</strong><br />
                        {address.street}, {address.city}, {address.state} - {address.pincode}, {address.country}
                      </p>
                      <h1 onClick={() => handleDelete(address._id)} className="text-red-500 hover:text-red-700">
                        <DeleteIcon />
                      </h1>
                    </label>
                  </div>
                ))
              ) : (
                <p>No addresses available.</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => router.push("/form")}
              className="bg-blue-600 hover:bg-black text-white py-2 px-4 text-sm rounded-sm font-semibold"
            >
              + Add New Address
            </button>
          </section>

          <section className="flex flex-col lg:flex-row gap-6 text-slate-800">
            <div className="w-full bg-white border rounded shadow p-4">
              <h2 className="text-xl font-bold text-black mb-4">Your Order</h2>
              <div className="grid grid-cols-2 text-sm md:text-base font-semibold border-b pb-2 mb-4">
                <span>Product</span>
                <span className="text-right">Subtotal</span>
              </div>

              <div className="grid grid-cols-2 text-sm md:text-base border-b py-2">
                <span>Item Details</span>
                <span className="text-right">{formatPrice(totalPrice)}</span>
              </div>
              <div className="grid grid-cols-2 text-sm md:text-base border-b py-2">
                <span>Subtotal</span>
                <span className="text-right">{formatPrice(totalPrice)}</span>
              </div>
              <div className="grid grid-cols-2 text-sm md:text-base py-2 font-bold">
                <span>Total</span>
                <span className="text-right">{formatPrice(totalPrice)}</span>
              </div>

              <div className="mt-6 flex flex-col gap-4 text-sm md:text-base text-slate-800">
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={selectedPayment === 'bank'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  Direct bank transfer
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="check"
                    checked={selectedPayment === 'check'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  Check payments
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedPayment === 'cod'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  Cash on delivery
                </label>

                <button
                  type="submit"
                  className={`mt-4 ${login ? 'w-1/3 min-w-[200px] text-center border rounded shadow bg-blue-600 hover:bg-black' : 'bg-gray-400 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded-sm text-lg`}
                  disabled={!login}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </section>
        </form>
      </section>

      <Footer />
    </main>
  );
}

export default CheckoutPage;