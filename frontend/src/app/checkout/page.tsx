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
import Carts from '@/components/UI/Carts';
import useAuth from '@/hook/useAuth';

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
interface CartItem {
  _id: string;
  total_price: number;
  quantity: number;
}
interface User {
  _id: string;
}

function CheckoutPage() {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const { carts } = useCart();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth() as { user: User | null; loading: boolean };

  const typedCarts: CartItem[] = carts || [];

  const subtotal = typedCarts.reduce(
    (acc: number, item: CartItem) => acc + item.total_price * item.quantity,
    0
  );


  useEffect(() => {
    if (!authLoading && user) {
      getAddress(user._id);
      setSelectedAddressId(null);
    } else if (!authLoading && !user) {

      router.replace('/login');
    }

  }, [user, authLoading]);

  const getAddress = async (id: string) => {
    try {
      const response = await GetAddress(id);
      if (response.success && Array.isArray(response.data)) {
        setAddresses(response.data);
        if (response.data.length > 0) setSelectedAddressId(response.data[0]._id);
        else setSelectedAddressId(null);
      }
    } catch (error) {
      console.error(error);
      setAddresses([]);
      setSelectedAddressId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await DeleteAddress(id);
      toast.success('Address removed successfully');
      if (user) getAddress(user._id);
    } catch (err) {
      console.error(err);
      toast.error('Error deleting address');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedAddressId) return toast.error("Please select a delivery address");
    if (!selectedPayment) return toast.error("Please select a payment method");
    if (!user) return toast.error("User not logged in");

    try {
      await handleCheckout(subtotal, router, selectedAddressId, carts, user);
    } catch (err) {
      console.error("Payment failed:", err);
      toast.error("Payment failed. Try again.");
    }
  };
  if (authLoading) {
    return (
      <main className="w-full min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white text-black flex flex-col items-center">
      <Navbar />

      <section className="w-full bg-slate-100 py-10 px-4 md:px-10 text-slate-800">
        <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto flex flex-col gap-10">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-slate-700">Checkout</h1>

          <div className="flex items-center gap-2 border-t pt-4 text-sm text-black">
            <OpenInBrowserIcon className="text-gray-600" />
            <span className="text-gray-500">Have a coupon?</span>
            <button type="button" className="text-blue-600 hover:underline">
              Click here to enter your code
            </button>
          </div>

          <section className="w-full bg-white p-4 rounded shadow text-slate-800">
            <h2 className="text-lg font-semibold mb-4">Select Delivery Address</h2>
            <div className="flex flex-col gap-4 mb-4">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div
                    key={address._id}
                    className="flex justify-between items-start bg-slate-50 p-3 rounded shadow"
                  >
                    <label
                      className="flex flex-row items-start gap-3 text-sm md:text-base cursor-pointer w-full"
                      htmlFor={`address-${address._id}`}
                    >
                      <input
                        id={`address-${address._id}`}
                        type="radio"
                        name="address"
                        value={address._id}
                        checked={selectedAddressId === address._id}
                        onChange={() => setSelectedAddressId(address._id)}
                        className="mt-1"
                      />
                      <p className="flex-1">
                        <strong>
                          {address.firstname} {address.lastname}
                        </strong>
                        <br />
                        {address.street}, {address.city}, {address.state} - {address.pincode},{' '}
                        {address.country}
                      </p>
                      <h1
                        onClick={() => handleDelete(address._id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        aria-label="Delete address"
                      >
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
              onClick={() => router.push('/form')}
              className="bg-blue-600 hover:bg-black text-white py-2 px-4 text-sm rounded-sm font-semibold"
            >
              + Add New Address
            </button>
          </section>

          <section className="flex flex-col lg:flex-row gap-6 text-slate-800">
            <div className="w-full bg-white border rounded shadow p-4">
              <h2 className="text-xl font-bold text-black mb-4">Your Order</h2>

              <div className="w-full max-w-5xl mx-auto space-y-4 p-4">
                {carts && carts.map((cart: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-start md:items-center gap-6 border rounded-2xl p-4 shadow-md bg-white"
                  >
                    <div className="w-full md:w-1/4 flex justify-center">
                      <img
                        src={cart.product_id.cover_image}
                        alt={cart.product_id.name}
                        className="w-32 h-32 object-cover rounded-xl border"
                      />
                    </div>

                
                    <div className="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-4">
               
                      <div>
                        <h3 className="text-sm md:text-base font-semibold text-gray-700">Product</h3>
                        <p className="text-gray-600">{cart.product_id.name}</p>
                      </div>

                      <div>
                        <h3 className="text-sm md:text-base font-semibold text-gray-700">Quantity</h3>
                        <p className="text-gray-600">{cart.quantity}</p>
                      </div>

                      <div>
                        <h3 className="text-sm md:text-base font-semibold text-gray-700">Price</h3>
                        <p className="text-gray-600">₹{cart.total_price}</p>
                      </div>

                      <div>
                        <h3 className="text-sm md:text-base font-semibold text-gray-700">Total</h3>
                        <p className="text-green-600 font-medium">₹{cart.quantity * cart.total_price}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 mt-6 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-800">Cart Total</h2>
                  <p className="text-xl font-semibold text-green-600">
                    ₹{subtotal}
                  </p>
                </div>
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
                <button
                  type="submit"
                  className={`mt-4 ${user
                    ? 'w-1/3 min-w-[200px] text-center border rounded shadow bg-blue-600 hover:bg-black'
                    : 'bg-gray-400 cursor-not-allowed'
                    } text-white font-bold py-2 px-4 rounded-sm text-lg`}
                  disabled={!user}
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
