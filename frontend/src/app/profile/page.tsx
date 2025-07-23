'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/UI/Navbar';
import Carts from '@/components/UI/Carts';
import useCart from '@/hook/useCart';
import { useRouter } from 'next/navigation';
import { getUser } from '@/networks/customernetworks';
import Orders from '@/components/UI/Orders';

interface CartItem {
  _id: string;
  total_price: number;
  quantity: number;
}

export default function Page() {
  const router = useRouter();
  const { carts, deleteCart } = useCart();


  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'account' | 'orders' | 'cart'>('account');


  const typedCarts: CartItem[] = (carts as CartItem[]) || [];
 const subtotal =
  typedCarts.reduce(
    (acc, item) => acc + (item.total_price ?? 0) * (item.quantity ?? 0),
    0
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedUserId = localStorage.getItem('eco_user_id');
    const storedName = localStorage.getItem('eco_user_name');
    const storedImg = localStorage.getItem('eco_user_image');
    const storedTab = localStorage.getItem('activeTab');

    setUserId(storedUserId && storedUserId !== 'null' ? storedUserId : null);
    setName(storedName && storedName !== 'null' ? storedName : null);
    setProfileImg(storedImg && storedImg !== 'null' ? storedImg : null);
    if (storedTab === 'orders' || storedTab === 'cart' || storedTab === 'account') {
      setActiveTab(storedTab);
    }
  }, []);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeTab', activeTab);
    }
  }, [activeTab]);


  useEffect(() => {
    if (!userId) {
      console.log('User id null');
      return;
    }

    const fetchUser = async () => {
      try {
       
        const data = await getUser(userId);
        setUserData(data);
      } catch (err) {
        console.error('User fetch error:', err);
      }
    };

    fetchUser();
  }, [userId]);


  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    router.replace('/login');
  };


  const fallbackImg =
    'https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg';

  return (
    <main className="flex flex-col bg-white min-h-screen">
      <Navbar />

      <section className="w-full min-h-screen flex flex-col md:flex-row bg-slate-200 gap-4 p-2 md:p-6">

        <div className="w-full md:w-[25%] lg:w-[20%] bg-white rounded-lg p-4 flex flex-col text-black gap-4 shadow-md">

          <div className="flex items-center gap-4">
            <img
              src={profileImg ?? fallbackImg}
              alt="profile"
              className="rounded-full h-16 w-16 md:h-20 md:w-20 border border-gray-300 object-cover"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-lg">Hello,</p>
              <p className="text-sm text-gray-700">{name || 'User'}</p>
            </div>
          </div>


          <nav className="flex flex-row md:flex-col justify-around md:justify-start gap-4 mt-4">
            <button
              className={`font-semibold text-base md:text-lg text-left ${activeTab === 'account' ? 'text-blue-600' : 'hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('account')}
            >
              My Account
            </button>
            <button
              className={`font-semibold text-base md:text-lg text-left ${activeTab === 'orders' ? 'text-blue-600' : 'hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('orders')}
            >
              My Orders
            </button>
            <button
              className={`font-semibold text-base md:text-lg text-left ${activeTab === 'cart' ? 'text-blue-600' : 'hover:text-blue-500'
                }`}
              onClick={() => setActiveTab('cart')}
            >
              My Cart
            </button>
            <button
              className="font-semibold text-base md:text-lg text-left hover:text-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>


        <div className="w-full md:w-[75%] lg:w-[80%] min-h-screen flex flex-col text-black bg-white rounded-lg p-4 shadow-md">
          {activeTab === 'account' && (
            <>
              <h2 className="text-lg md:text-2xl font-semibold px-2 mb-4">Personal Information</h2>
              {userData ? (
                <div className="relative bg-white p-4 md:p-6   text-gray-800 w-full  mx-auto">
                  <button
                    onClick={() => alert('Change Profile Clicked!')}
                    className="absolute top-3 right-3 bg-blue-600 text-white text-xs md:text-sm px-3 py-1 rounded-md shadow hover:bg-blue-700 transition"
                  >
                    Change Profile
                  </button>

                  {/* Profile Image + User Info */}
                  <div className="flex flex-col md:flex-row items-center gap-4 mb-6 mt-6 md:mt-0">
                    <img
                      src={userData.profile}
                      alt="Profile"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border object-cover shadow"
                    />
                    <div className="text-center md:text-left">
                      <p className="text-2xl font-bold">{userData.name}</p>
                      <p className="text-sm text-gray-500">
                        Member since {new Date(userData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div className="bg-gray-50 p-2 rounded border">
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="text-lg font-semibold">{userData.email}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border">
                      <p className="text-gray-500 text-sm">Phone</p>
                      <p className="text-lg font-semibold">{userData.phone_no}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border">
                      <p className="text-gray-500 text-sm">Gender</p>
                      <p className="text-lg font-semibold capitalize">{userData.gender}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border">
                      <p className="text-gray-500 text-sm">Account Created</p>
                      <p className="text-lg font-semibold">
                        {new Date(userData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 text-sm md:text-base">Loading / No data.</p>
              )}
            </>
          )}




          {activeTab === 'orders' && (
            <>
              <h2 className="text-lg md:text-xl font-semibold mb-4">My Orders</h2>
              <Orders />
            </>
          )}

          {activeTab === 'cart' && (
            <Carts
              carts={carts}
              onRemove={deleteCart}
              onCheckout={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('checkout_subtotal', subtotal.toString());
                }
                router.replace('/checkout');
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
}
