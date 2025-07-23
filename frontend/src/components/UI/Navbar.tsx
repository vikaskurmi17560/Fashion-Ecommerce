'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import FitbitIcon from '@mui/icons-material/Fitbit';
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import useCart from '@/hook/useCart';

const navigation = ['/', '/about', '/contact', '/mensection', '/womensection'];
const paths = ['cart', 'checkout', 'profile'];

function Navbar() {
  const router = useRouter();
  const path = usePathname();

  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [seeBucket, setSeeBucket] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const { carts, deleteCart, getCarts } = useCart();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setName(localStorage.getItem('eco_user_name'));
      setProfileImg(localStorage.getItem('eco_user_image'));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setName(null);
    setProfileImg(null);
    router.replace('/login');
  };

  const renderNavLinks = useCallback(() => (
    <>
      <Link href="/products" className="hover:text-blue-200">EVERYTHING</Link>
      <Link href="/womensection" className="hover:text-blue-200">WOMEN</Link>
      <Link href="/mensection" className="hover:text-blue-200">MEN</Link>
      <Link href="/accessories" className="hover:text-blue-200">ACCESSORIES</Link>
    </>
  ), []);

  return (
    <div className={`px-1 z-20 relative w-full ${navigation.includes(path) ? 'bg-black/10 text-white' : 'bg-white text-black'}`}>


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


          {!paths.some((p) => path.includes(p)) && (
            <button
              className="hover:text-blue-200"
              onClick={() => {
                getCarts();
                setSeeBucket(!seeBucket);
              }}
              aria-label="Toggle cart bucket"
            >
              <ShoppingCartIcon />
            </button>
          )}


          {name || profileImg ? (
            path.includes("profile") ? (
              <button
                onClick={() => { handleLogout() }}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Logout
              </button>
            ) : (

              <div
                className="flex lg:gap-4 md:gap-2 items-center cursor-pointer"
                onClick={() => router.push('/profile')}
              >
                <h1>{name}</h1>
                <img
                  src={profileImg && profileImg !== 'null' ? profileImg : 'https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg'}
                  alt="profile"
                  className="rounded-full lg:h-14 lg:w-14 md:h-8 md:w-8 object-cover"
                />
              </div>
            )
          ) : (

            <Link href="/login" className="hover:text-blue-200">
              SIGNIN/SIGNUP
            </Link>
          )}

        </div>
      </div>


      <div className="md:hidden flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold flex items-center gap-1">
          <FitbitIcon /> LOGO
        </Link>
        <div className="flex items-center gap-4">
          {!paths.some((p) => path.includes(p)) && (
            <button
              onClick={() => {
                getCarts();
                setSeeBucket(!seeBucket);
              }}
              aria-label="Toggle cart bucket"
            >
              <ShoppingCartIcon />
            </button>
          )}
          <button
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              if (!showMobileMenu) setSeeBucket(false);
            }}
            aria-label="Toggle mobile menu"
          >
            {showMobileMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>


     {showMobileMenu && (
  <div
    className="md:hidden fixed inset-0 text-black bg-black/40 z-40"
    onClick={() => setShowMobileMenu(false)}
  >
    {/* Drawer container */}
    <div
      className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg flex flex-col p-5 transition-transform duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header with Close Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Menu</h1>
        <button
          className="p-1 rounded hover:bg-gray-100"
          onClick={() => setShowMobileMenu(false)}
        >
          ✕
        </button>
      </div>

      {/* Profile / Auth Section */}
      <div className="mb-6">
        {name || profileImg ? (
          path.includes("profile") ? (
            <button
              onClick={() => handleLogout()}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <div
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setShowMobileMenu(false);
                router.push("/profile");
              }}
            >
              <img
                src={
                  profileImg && profileImg !== "null"
                    ? profileImg
                    : "https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg"
                }
                alt="profile"
                className="rounded-full h-10 w-10 object-cover border"
              />
              <span className="text-base font-semibold">{name}</span>
            </div>
          )
        ) : (
          <Link
            href="/login"
            className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            SIGNIN / SIGNUP
          </Link>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3 text-lg">
        {renderNavLinks()}
        <Link href="/about" className="hover:text-blue-600 transition">
          ABOUT
        </Link>
        <Link href="/contact" className="hover:text-blue-600 transition">
          CONTACT
        </Link>
      </nav>
    </div>
  </div>
)}



      {seeBucket && (
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] h-screen bg-white absolute top-0 right-0 border-slate-200 border-2 transition-all duration-300 flex flex-col items-center z-20">
          <div className="w-full h-[7%] border-b-2 border-slate-300 flex items-center justify-between px-4 text-black">
            <h1 className="text-lg font-semibold">Shopping Cart</h1>
            <button onClick={() => setSeeBucket(false)} aria-label="Close cart sidebar"><CancelIcon /></button>
          </div>
          <div className="h-[68%] w-full overflow-auto flex flex-col items-center gap-4 p-4 text-black">
            {carts?.map((cart: any) => (
              <div key={cart._id} className="flex w-full border-b border-gray-300 p-2 gap-4">
                <img src={cart.product_id.cover_image} alt="product" className="w-20 h-24 object-cover" />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between">
                    <h1>{cart.product_id.name}</h1>
                    <button onClick={() => deleteCart(cart._id)} aria-label={`Remove ${cart.product_id.name} from cart`}><ClearIcon /></button>
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
                <button onClick={() => router.push('/cart')} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition">
                  VIEW CART
                </button>
                <button onClick={() => setSeeBucket(false)} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSeeBucket(false);
                  router.push('/products');
                }}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition"
              >
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
