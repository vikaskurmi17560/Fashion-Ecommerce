'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/UI/Navbar';
import Carts from '@/components/UI/Carts';
import useCart from '@/hook/useCart';
import { useRouter } from 'next/navigation';
import { getUser, logout } from '@/networks/customernetworks';
import Orders from '@/components/UI/Orders';
import useAuth from "@/hook/useAuth";
import EditProfile from '@/components/UI/EditProfile';
import { useHelpStore } from '@/service/help';

interface CartItem {
  _id: string;
  total_price: number;
  quantity: number;
}

interface User {
  _id: string;
}

export default function Page() {
  const router = useRouter();
  const { carts } = useCart();
  const { user, loading: authLoading } = useAuth() as { user: User | null; loading: boolean };

  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'account' | 'orders' | 'cart' | 'editprofile'>('account');
  const [loadingUserData, setLoadingUserData] = useState<boolean>(false);

  const typedCarts: CartItem[] = (carts as CartItem[]) || [];

  const { setProfile, name, profile, email, gender, phone_no } = useHelpStore();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchUserData = async () => {
      setLoadingUserData(true);
      try {
        const data = await getUser(user._id);

        setProfile({
          name: data.name,
          profile: data.profile,
          email: data.email,
          phone_no: Number(data.phone_no),
          gender: data.gender,
        });

        setUserData(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchUserData();
  }, [user, setProfile]);

  const handleLogout = () => {
    logout();
    setProfile({
      name: "",
      profile: "",
      email: "",
      phone_no: 0,
      gender: "",
    })
    router.replace('/login');
  };

  const fallbackImg =
    'https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg';

  if (authLoading || loadingUserData) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-white">
        Loading ...
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-col bg-white min-h-screen">
      <Navbar />

      <section className="w-full min-h-screen flex flex-col md:flex-row bg-slate-200 gap-4 p-2 md:p-6">

        <div className="w-full md:w-[25%] lg:w-[20%] bg-white rounded-lg p-4 flex flex-col text-black gap-4 shadow-md">
          <div className="flex items-center gap-4">
            <img
              src={profile || fallbackImg}
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
              className={`font-semibold text-base md:text-lg text-left ${activeTab === 'account' ? 'text-blue-600' : 'hover:text-blue-500'}`}
              onClick={() => setActiveTab('account')}
            >
              My Account
            </button>
            <button
              className={`font-semibold text-base md:text-lg text-left ${activeTab === 'orders' ? 'text-blue-600' : 'hover:text-blue-500'}`}
              onClick={() => setActiveTab('orders')}
            >
              My Orders
            </button>
            <button
              className={`font-semibold text-base md:text-lg text-left ${activeTab === 'cart' ? 'text-blue-600' : 'hover:text-blue-500'}`}
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
                <div className="relative bg-white p-4 md:p-6 text-gray-800 w-full mx-auto">
                  <button
                    onClick={() => setActiveTab('editprofile')}
                    className="absolute top-3 right-3 bg-blue-600 text-white text-xs md:text-sm px-3 py-1 rounded-md shadow hover:bg-blue-700 transition"
                  >
                    Change Profile
                  </button>

                  <div className="flex flex-col md:flex-row items-center gap-4 mb-6 mt-6 md:mt-0">
                    <img
                      src={profile || fallbackImg}
                      alt="Profile"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border object-cover shadow"
                    />
                    <div className="text-center md:text-left">
                      <p className="text-2xl font-bold">{name}</p>
                      <p className="text-sm text-gray-500">
                        Member since {new Date(userData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 p-2 rounded border">
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="text-lg font-semibold">{email}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border">
                      <p className="text-gray-500 text-sm">Phone</p>
                      <p className="text-lg font-semibold">{phone_no}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border">
                      <p className="text-gray-500 text-sm">Gender</p>
                      <p className="text-lg font-semibold capitalize">{gender}</p>
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
                <div className="flex items-center justify-center min-h-screen bg-white">
                  Loading ...
                </div>
              )}
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <h2 className="text-lg md:text-xl font-semibold mb-4">My Orders</h2>
              <Orders />
            </>
          )}
          {activeTab === 'editprofile' && (
            <EditProfile user_id={userData._id} editprofile={activeTab} setEditProfile={setActiveTab} />
          )}
          {activeTab === 'cart' && (
            <Carts onCheckout={() => router.replace('/checkout')} />
          )}
        </div>
      </section>
    </main>
  );
}