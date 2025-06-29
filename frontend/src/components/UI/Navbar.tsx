'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FitbitIcon from '@mui/icons-material/Fitbit';
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { usePathname, useRouter } from 'next/navigation';
import useCart from '@/hook/useCart';

const navigation = ['/', '/about', '/contact', '/mensection', '/womensection'];

function Navbar() {
  const router = useRouter();
  const path = usePathname();

  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [seeBucket, setSeeBucket] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const { carts, deleteCart, getCarts } = useCart();

  useEffect(() => {
    const userName = localStorage.getItem("user_name");
    const userImg = localStorage.getItem("user_image");
    if (userName) setName(userName);
    if (userImg) setProfileImg(userImg);
  }, []);

  const renderNavLinks = () => (
    <>
      <Link href="/products" className="hover:text-blue-200">EVERYTHING</Link>
      <Link href="/womensection" className="hover:text-blue-200">WOMEN</Link>
      <Link href="/mensection" className="hover:text-blue-200">MEN</Link>
      <Link href="/accessories" className="hover:text-blue-200">ACCESSORIES</Link>
    </>
  );

  return (
    <div className={`px-1 z-20 relative w-full ${navigation.includes(path) ? "bg-black/10 text-white" : "bg-white text-black"}`}>
      <div className="hidden md:flex items-center justify-between lg:h-32 md:h-24 font-semibold lg:px-6 md:px-2 px-1">
        <div className="flex items-center lg:gap-x-20 md:gap-x-2 lg:p-3 md:p-0">
          <Link href="/" className="lg:text-4xl md:text-sm font-bold hover:text-blue-200 flex items-center gap-1">
            <FitbitIcon /> LOGO
          </Link>
          <div className="flex lg:gap-8 md:gap-2 lg:text-xl md:text-sm">
            {renderNavLinks()}
          </div>
        </div>
        <div className="flex items-center justify-between h-20 lg:gap-x-8 md:gap-x-2 lg:text-xl md:text-sm">
          <Link href="/about" className="hover:text-blue-200">ABOUT</Link>
          <Link href="/contact" className="hover:text-blue-200">CONTACT</Link>
          {!path.includes("cart") && (
            <button
              className="hover:text-blue-200"
              onClick={() => {
                getCarts();
                setSeeBucket(!seeBucket);
              }}
            >
              <ShoppingCartIcon />
            </button>
          )}
          {name || profileImg ? (
            <div className="flex lg:gap-4 md:gap-2 items-center">
              <h1>{name}</h1>
              <img
                src={profileImg && profileImg !== "null" ? profileImg : "https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg"}
                className="rounded-full lg:h-14 lg:w-14 md:h-8 md:w-8"
              />
            </div>
          ) : (
            <Link href="/login" className="hover:text-blue-200">SIGNIN/SIGNUP</Link>
          )}
        </div>
      </div>

      <div className="md:hidden flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold flex items-center gap-1">
          <FitbitIcon /> LOGO
        </Link>
        <div className="flex items-center gap-4">
          {!path.includes("cart") && (
            <button
              onClick={() => {
                getCarts();
                setSeeBucket(!seeBucket);
              }}
            >
              <ShoppingCartIcon />
            </button>
          )}
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden bg-white w-full absolute top-16 left-0 z-10 border-t border-gray-300 shadow-md">
          <div className="flex flex-col gap-4 p-4 text-black font-semibold text-lg">
            {/* Profile section moved to the top */}
            {name || profileImg ? (
              <div className="flex items-center gap-2 mt-2">
                <span>{name}</span>
                <img
                  src={profileImg && profileImg !== "null" ? profileImg : "https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg"}
                  className="rounded-full h-10 w-10"
                />
              </div>
            ) : (
              <Link href="/login">SIGNIN/SIGNUP</Link>
            )}
            {renderNavLinks()}
            <Link href="/about">ABOUT</Link>
            <Link href="/contact">CONTACT</Link>
          </div>
        </div>
      )}

      {seeBucket && (
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] h-screen bg-white absolute top-0 right-0 border-slate-200 border-2 transition-all duration-300 flex flex-col items-center z-20">
          <div className="w-full h-[7%] border-b-2 border-slate-300 flex items-center justify-between px-4">
            <h1 className="text-lg font-semibold">Shopping Cart</h1>
            <button onClick={() => setSeeBucket(false)}><CancelIcon /></button>
          </div>
          <div className="h-[68%] w-full overflow-auto flex flex-col items-center gap-4 p-4 text-black">
            {carts?.map((cart: any) => (
              <div key={cart._id} className="flex w-full border-b border-gray-300 p-2 gap-4">
                <img src={cart.product_id.cover_image} alt="img" className="w-20 h-24 object-cover" />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between">
                    <h1>{cart.product_id.name}</h1>
                    <button onClick={() => deleteCart(cart._id)}><ClearIcon /></button>
                  </div>
                  <div className="text-gray-500">
                    <span>{cart.quantity} x </span>
                    <span>${cart.total_price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full border-t border-slate-300 p-4">
            {carts.length > 0 ? (
              <div className="flex flex-col gap-2">
                <button onClick={() => router.push("/cart")} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition">
                  VIEW CART
                </button>
                <button onClick={() => setSeeBucket(false)} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <button onClick={() => setSeeBucket(false)} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition">
                SHOP NOW
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
