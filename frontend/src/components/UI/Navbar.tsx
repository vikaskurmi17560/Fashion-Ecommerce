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

interface Product {
  _id: string;
  cover_image: string;
  name: string;
  price?: number; 
}

interface CartItem {
  _id: string;
  product_id: Product;
  quantity: number;
  total_price?: number; 
}

const navigation = ['/', '/about', '/contact', '/mensection', '/womensection'];
const paths = ['cart', 'checkout', 'profile'];

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();

  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [seeBucket, setSeeBucket] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { carts: rawCarts, deleteCart, getCarts, updateCartQuantity } = useCart();
  const carts: CartItem[] = rawCarts ?? [];

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

  
  const getPrice = (item: CartItem) => {
    
    const price = item.total_price ?? item.product_id.price ?? 0;
    return typeof price === 'number' && !isNaN(price) ? price : 0;
  };

  const handleQuantityChange = async (productId: string, change: number) => {
    try {
      const updated = await updateCartQuantity(productId, change);
      if (updated) {
        getCarts();
      }
    } catch (error) {
      console.error('Quantity update failed:', error);
    }
  };

  const handleDelete = async (cartId: string) => {
    try {
      await deleteCart(cartId);
      getCarts();
    } catch (error) {
      console.error('Delete cart item failed:', error);
    }
  };

  
  const subtotal = carts.reduce((acc, item) => {
    const price = getPrice(item);
    const qty = item.quantity ?? 1;
    return acc + price * qty;
  }, 0);

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
                onClick={handleLogout}
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
          <div
            className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg flex flex-col p-5 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">Menu</h1>
              <button
                className="p-1 rounded hover:bg-gray-100"
                onClick={() => setShowMobileMenu(false)}
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              {name || profileImg ? (
                path.includes("profile") ? (
                  <button
                    onClick={handleLogout}
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
            <button onClick={() => setSeeBucket(false)} aria-label="Close cart sidebar">
              <CancelIcon />
            </button>
          </div>
          <div className="h-[68%] w-full overflow-auto flex flex-col items-center gap-4 p-4 text-black">
            {carts.length > 0 ? (
              carts.map((cart) => {
                const price = getPrice(cart);
                const quantity = cart.quantity ?? 1;
                const itemSubtotal = price * quantity;

                return (
                  <div key={cart._id} className="flex w-full border-b border-gray-300 p-2 gap-4">
                    <img
                      src={cart.product_id.cover_image}
                      alt={cart.product_id.name || 'product'}
                      className="w-20 h-24 object-cover"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between">
                        <h1>{cart.product_id.name}</h1>
                        <button
                          onClick={() => handleDelete(cart._id)}
                          aria-label={`Remove ${cart.product_id.name} from cart`}
                        >
                          <ClearIcon />
                        </button>
                      </div>
                      <div className="text-gray-500 flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (quantity > 1) handleQuantityChange(cart.product_id._id, -1);
                          }}
                          disabled={quantity <= 1}
                          className="px-2 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50"
                        >
                          -
                        </button>
                        <span>{quantity}</span>
                        <button
                          onClick={() => {
                            if (quantity < 5) handleQuantityChange(cart.product_id._id, +1);
                          }}
                          disabled={quantity >= 5}
                          className="px-2 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50"
                        >
                          +
                        </button>
                        <span> x ₹{price.toFixed(2)}</span>
                        <span className="ml-auto font-semibold">Subtotal: ₹{itemSubtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center w-full text-gray-500">Your cart is empty.</p>
            )}
          </div>
          <div className="w-full border-t border-slate-300 p-4">
            {carts.length > 0 ? (
              <div className="flex flex-col gap-2">
             
                <div className="flex justify-between text-black text-lg font-semibold border p-2 rounded-md mb-3">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => router.push('/cart')}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition"
                >
                  VIEW CART
                </button>
                <button
                  onClick={() => setSeeBucket(false)}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition"
                >
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
