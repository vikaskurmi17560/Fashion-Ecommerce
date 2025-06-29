'use client';

import { useEffect, useState } from 'react';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleCheckout } from '@/networks/paymentnetworks';
import { DeleteAddress, GetAddress } from '@/networks/addressnetworks';
import toast from 'react-hot-toast';

type AddressType = {
  _id: string;
  customer_id: string;
  firstname: string;
  lastname: string;
  country: string;
  city: string;
  state: string;
  pincode: string;
  street: string;
};

function CheckoutPage() {
  const [login, setLogin] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('user_id');
    if (id) {
      setLogin(true);
      getAddress(id);
    } else {
      setLogin(false);
      router.replace('/login');
    }
  }, []);

  const getAddress = async (id: string | null) => {
    try {
      const response = await GetAddress(id);
      if (response.success && Array.isArray(response.data)) {
        setAddresses(response.data);
        if (response.data.length > 0) {
          setSelectedAddressId(response.data[0]._id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await DeleteAddress(id);
      toast.success("Address removed successfully");
      const userId = localStorage.getItem('user_id');
      getAddress(userId);
    } catch (err) {
      console.error(err);
      toast.error('Error deleting address');
    }
  };

  return (
    <main className="w-full min-h-screen bg-white text-black flex flex-col items-center">
      <Navbar />

      <section className="w-full bg-slate-100 py-10 px-4 md:px-10 text-slate-800">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-slate-700">Checkout</h1>

          {!login && (
            <div className="flex items-center gap-2 border-t pt-4 text-sm text-black">
              <OpenInBrowserIcon className="text-gray-600" />
              <span className="text-gray-500">Returning customer?</span>
              <button onClick={() => router.replace('/login')} className="text-blue-600 hover:underline">Click here to login</button>
            </div>
          )}

          <div className="flex items-center gap-2 border-t pt-4 text-sm text-black">
            <OpenInBrowserIcon className="text-gray-600" />
            <span className="text-gray-500">Have a coupon?</span>
            <button className="text-blue-600 hover:underline">Click here to enter your code</button>
          </div>

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
              onClick={() => router.push("/form")}
              className="bg-blue-600 hover:bg-black text-white py-2 px-4 text-sm rounded-sm font-semibold"
            >
              + Add New Address
            </button>
          </section>

          <section className="flex flex-col lg:flex-row gap-6 text-slate-800">
            <div className="w-full lg:w-1/2 bg-white border rounded shadow p-4">
              <h2 className="text-xl font-bold text-black mb-4">Your Order</h2>
              <div className="grid grid-cols-2 text-sm md:text-base font-semibold border-b pb-2 mb-4">
                <span>Product</span>
                <span className="text-right">Subtotal</span>
              </div>

              <div className="grid grid-cols-2 text-sm md:text-base border-b py-2">
                <span>Item Details</span>
                <span className="text-right">$450</span>
              </div>
              <div className="grid grid-cols-2 text-sm md:text-base border-b py-2">
                <span>Subtotal</span>
                <span className="text-right">$450</span>
              </div>
              <div className="grid grid-cols-2 text-sm md:text-base py-2 font-bold">
                <span>Total</span>
                <span className="text-right">$450</span>
              </div>

              <form className="mt-6 flex flex-col gap-4 text-sm md:text-base text-slate-800">
                <label className="flex gap-2 items-center">
                  <input type="radio" name="payment" />
                  Direct bank transfer
                </label>
                <label className="flex gap-2 items-center">
                  <input type="radio" name="payment" />
                  Check payments
                </label>
                <label className="flex gap-2 items-center">
                  <input type="radio" name="payment" />
                  Cash on delivery
                </label>

                <button
                  type="button"
                  onClick={() => {
                    if (login) {
                      const customer = localStorage.getItem("user_id");
                      handleCheckout(15000);
                    } else {
                      toast.error("Please login to proceed");
                    }
                  }}
                  className={`mt-4 ${login ? 'bg-blue-600 hover:bg-black' : 'bg-gray-400 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded-sm text-lg`}
                  disabled={!login}
                >
                  Pay
                </button>
              </form>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default CheckoutPage;
