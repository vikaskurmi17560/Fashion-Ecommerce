'use client';

import { useEffect, useState } from 'react';
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

const navigation = ['/', '/about', '/contact', '/products'];
const excludedPathsForCart = ['cart', 'checkout', 'profile'];

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();

  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [seeBucket, setSeeBucket] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { carts: backendCarts, deleteCart, getCarts, updateCartQuantity } = useCart();
  
  // State for local storage cart when NOT logged in
  const [localCarts, setLocalCarts] = useState<CartItem[]>([]);
  
  // Check login state
  const loggedIn = Boolean(typeof window !== 'undefined' && localStorage.getItem('eco_user_id'));

  // Load user info & cart on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setName(localStorage.getItem('eco_user_name'));
      setProfileImg(localStorage.getItem('eco_user_image'));

      if (!loggedIn) {
        // Load cart from localStorage if not logged in
        const savedCart = localStorage.getItem('local_cart');
        if (savedCart) {
          try {
            setLocalCarts(JSON.parse(savedCart));
          } catch {
            setLocalCarts([]);
          }
        }
      } else {
        // Logged in: fetch cart from backend
        getCarts();
      }
    }
  }, [loggedIn, getCarts]);

  // Use backend carts if logged in, otherwise local carts
  const carts = loggedIn ? backendCarts ?? [] : localCarts;

  const handleLogout = () => {
    localStorage.clear();
    setName(null);
    setProfileImg(null);
    setLocalCarts([]);
    router.replace('/login');
  };

  const getPrice = (item: CartItem) => {
    const price = item.total_price ?? item.product_id.price ?? 0;
    return typeof price === 'number' && !isNaN(price) ? price : 0;
  };

  // For logged in users, update quantity via backend; for guests, update local storage
  const handleQuantityChange = async (productId: string, change: number) => {
    if (loggedIn) {
      try {
        const updated = await updateCartQuantity(productId, change);
        if (updated) {
          getCarts();
        }
      } catch (error) {
        console.error('Quantity update failed:', error);
      }
    } else {
      // Guest user: update local storage cart
      const updatedLocalCarts = localCarts.map(item => {
        if (item.product_id._id === productId) {
          const newQty = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      setLocalCarts(updatedLocalCarts);
      localStorage.setItem('local_cart', JSON.stringify(updatedLocalCarts));
    }
  };

  // For logged in users, delete cart item via backend; for guests, delete from local storage
  const handleDelete = async (cartId: string) => {
    if (loggedIn) {
      try {
        await deleteCart(cartId);
        getCarts();
      } catch (error) {
        console.error('Delete cart item failed:', error);
      }
    } else {
      // Guest user: remove from local cart by product _id
      const updatedLocalCarts = localCarts.filter(item => item.product_id._id !== cartId);
      setLocalCarts(updatedLocalCarts);
      localStorage.setItem('local_cart', JSON.stringify(updatedLocalCarts));
    }
  };

  const subtotal = carts.reduce((acc, item) => {
    const price = getPrice(item);
    const qty = item.quantity ?? 1;
    return acc + price * qty;
  }, 0);

  const toggleBucket = () => {
    setSeeBucket((prev) => {
      if (!prev) setShowMobileMenu(false);
      return !prev;
    });
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => {
      if (!prev) setSeeBucket(false);
      return !prev;
    });
  };

  const canShowCart = !excludedPathsForCart.some((p) => path.includes(p));

  return (
    <div className={`px-1 z-20 relative w-full ${navigation.includes(path) ? 'bg-black/10 text-white' : 'bg-white text-black'}`}>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between lg:h-32 md:h-24 font-semibold lg:px-6 md:px-2 px-1">
        <div className="flex items-center lg:gap-x-20 md:gap-x-2 lg:p-3 md:p-0">
          <Link href="/" className="lg:text-4xl md:text-sm font-bold hover:text-blue-200 flex items-center gap-1">
            <FitbitIcon /> LOGO
          </Link>
          <div className="flex lg:gap-8 md:gap-2 lg:text-xl md:text-sm">
            <Link href="/products" className="hover:text-blue-200">
              SHOP
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between h-20 lg:gap-x-8 md:gap-x-2 lg:text-xl md:text-sm">
          <Link href="/about" className="hover:text-blue-200">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-blue-200">
            CONTACT
          </Link>

          {canShowCart && (
            <button className="hover:text-blue-200" onClick={toggleBucket} aria-label="Toggle cart bucket">
              <ShoppingCartIcon />
            </button>
          )}

          {name || profileImg ? (
            path.includes('profile') ? (
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-semibold">
                Logout
              </button>
            ) : (
              <div
                className="flex lg:gap-4 md:gap-2 items-center cursor-pointer"
                onClick={() => router.push('/profile')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && router.push('/profile')}
                aria-label="Go to profile"
              >
                <h1>{name}</h1>
                <img
                  src={
                    profileImg && profileImg !== 'null'
                      ? profileImg
                      : 'https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg'
                  }
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

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold flex items-center gap-1">
          <FitbitIcon /> LOGO
        </Link>
        <div className="flex items-center gap-4">
          {canShowCart && (
            <button onClick={toggleBucket} aria-label="Toggle cart bucket">
              <ShoppingCartIcon />
            </button>
          )}
          <button onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {showMobileMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 text-black bg-black/40 z-40" onClick={() => setShowMobileMenu(false)}>
          <div
            className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg flex flex-col p-5 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">Menu</h1>
              <button className="p-1 rounded hover:bg-gray-100" onClick={() => setShowMobileMenu(false)} aria-label="Close menu">
                ✕
              </button>
            </div>

            <div className="mb-6">
              {name || profileImg ? (
                path.includes('profile') ? (
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
                      router.push('/profile');
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && router.push('/profile')}
                    aria-label="Go to profile"
                  >
                    <img
                      src={
                        profileImg && profileImg !== 'null'
                          ? profileImg
                          : 'https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg'
                      }
                      alt="profile"
                      className="rounded-full h-10 w-10 object-cover border"
                    />
                    <span className="text-base font-semibold">{name}</span>
                  </div>
                )
              ) : (
                <Link href="/login" className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  SIGNIN / SIGNUP
                </Link>
              )}
            </div>

            <nav className="flex flex-col gap-3 text-lg">
              <Link href="/about" className="hover:text-blue-600 transition">
                ABOUT
              </Link>
              <Link href="/contact" className="hover:text-blue-600 transition">
                CONTACT
              </Link>
              <Link href="/products" className="hover:text-blue-600 transition">
                SHOP
              </Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-semibold">
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
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
                          onClick={() => handleDelete(loggedIn ? cart._id : cart.product_id._id)}
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
                          aria-label={`Decrease quantity of ${cart.product_id.name}`}
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
                          aria-label={`Increase quantity of ${cart.product_id.name}`}
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
                {loggedIn ? (
                  <button
                    onClick={() => router.push('/cart')}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition"
                  >
                    VIEW CART
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSeeBucket(false);
                      router.push('/login');
                    }}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition"
                  >
                    LOGIN TO CHECKOUT
                  </button>
                )}

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
