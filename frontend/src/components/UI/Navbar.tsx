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
import useAuth from '@/hook/useAuth';
import { getUser, logout } from '@/networks/customernetworks';
import { useHelpStore } from '@/service/help';

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

interface User {
  _id: string;
}

const navigation = ['/', '/about', '/contact', '/products'];
const excludedPathsForCart = ['cart', 'checkout', 'profile'];

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const { user, setUser } = useAuth() as {
  user: User | null;
  setUser: (user: User | null) => void;
};
  const { carts, deleteCart, getCarts, updateCartQuantity } = useCart();
  const {count , setCount}=useHelpStore();
  const [seeBucket, setSeeBucket] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (user) {
      getCarts();
      const fetchUserData = async () => {
        try {
          const data = await getUser(user._id);
          setUserData(data);
        } catch {
          setUserData(null);
        } finally {
          setLoadingUserData(false);
        }
      };
      fetchUserData();
    } else {
      setUserData(null);
      setLoadingUserData(false);
    }
  }, [user]);

  const cartItems: CartItem[] = carts ?? [];
  const getPrice = (item: CartItem): number => item.total_price ?? item.product_id.price ?? 0;

  const handleQuantityChange = async (productId: string, change: number) => {
    try {
      const updated = await updateCartQuantity(productId, change);
      if (updated) getCarts();
    } catch {}
  };

  const handleDelete = async (cartId: string) => {
    try {
      await deleteCart(cartId);
      getCarts();
    } catch {}
  };

  const toggleBucket = () => {
    setSeeBucket((prev) => {
      const newState = !prev;
      if (newState) {
        getCarts();
        setShowMobileMenu(false);
      }
      return newState;
    });
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => {
      if (!prev) setSeeBucket(false);
      return !prev;
    });
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      setCount(0);
      await logout();
      setUser(null);
      router.replace('/login');
    } catch {
      setLoggingOut(false);
    }
  };

  const canShowCart = !excludedPathsForCart.some((p) => path.includes(p));

  return (
    <div className={`px-1 z-20 relative w-full ${navigation.includes(path) ? 'bg-black/10 text-white' : 'bg-white text-black'}`}>
      <div className="hidden md:flex items-center justify-between lg:h-32 md:h-24 font-semibold lg:px-6 md:px-2 px-1">
        <div className="flex items-center lg:gap-x-20 md:gap-x-2 lg:p-3 md:p-0">
          <Link href="/" className="lg:text-4xl md:text-sm font-bold hover:text-blue-200 flex items-center gap-1">
            <FitbitIcon />
            LOGO
          </Link>
          <div className="flex lg:gap-8 md:gap-2 lg:text-xl md:text-sm">
            <Link href="/products" className="hover:text-blue-200">SHOP</Link>
          </div>
        </div>
        <div className="flex items-center justify-between h-20 lg:gap-x-8 md:gap-x-2 lg:text-xl md:text-sm">
          <Link href="/about" className="hover:text-blue-200">ABOUT</Link>
          <Link href="/contact" className="hover:text-blue-200">CONTACT</Link>
          {canShowCart && (
            <button className="relative hover:text-blue-200" onClick={toggleBucket} type="button">
              <ShoppingCartIcon />
              {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full px-1.5 text-xs font-bold min-w-[18px] text-center">{count}</span>
              )}
            </button>
          )}
          {user ? (
            loadingUserData ? (
              <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
            ) : path.includes('profile') ? (
              <button onClick={handleLogout} disabled={loggingOut} className="text-red-500 hover:text-red-700 font-semibold disabled:opacity-50" type="button">
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            ) : (
              <div className="flex lg:gap-4 md:gap-2 items-center cursor-pointer" onClick={() => router.push('/profile')}>
                <h1>{userData?.name || 'User'}</h1>
                <img src={userData?.profile ?? 'https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg'} alt="profile" className="rounded-full lg:h-14 lg:w-14 md:h-8 md:w-8 object-cover" />
              </div>
            )
          ) : (
            <Link href="/login" className="hover:text-blue-200">SIGNIN/SIGNUP</Link>
          )}
        </div>
      </div>
      <div className="md:hidden flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold flex items-center gap-1">
          <FitbitIcon />
          LOGO
        </Link>
        <div className="flex items-center gap-4">
          {canShowCart && (
            <button className="relative" onClick={toggleBucket} type="button">
              <ShoppingCartIcon />
              {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full px-1.5 text-xs font-bold min-w-[18px] text-center">{count}</span>
              )}
            </button>
          )}
          <button onClick={toggleMobileMenu} type="button">{showMobileMenu ? <CloseIcon /> : <MenuIcon />}</button>
        </div>
      </div>
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 text-black bg-black/40 z-40" onClick={() => setShowMobileMenu(false)}>
          <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg flex flex-col p-5 transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">Menu</h1>
              <button className="p-1 rounded hover:bg-gray-100" onClick={() => setShowMobileMenu(false)} type="button">✕</button>
            </div>
            <div className="mb-6">
              {user ? (
                loadingUserData ? (
                  <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
                ) : path.includes('profile') ? (
                  <button onClick={handleLogout} disabled={loggingOut} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-50" type="button">
                    {loggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                ) : (
                  <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer" onClick={() => { setShowMobileMenu(false); router.push('/profile'); }}>
                    <img src={userData?.profile ?? 'https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg'} alt="profile" className="rounded-full h-10 w-10 object-cover border" />
                    <span className="text-base font-semibold">{userData?.name || 'User'}</span>
                  </div>
                )
              ) : (
                <Link href="/login" className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">SIGNIN / SIGNUP</Link>
              )}
            </div>
            <nav className="flex flex-col gap-3 text-lg">
              <Link href="/about" className="hover:text-blue-600 transition">ABOUT</Link>
              <Link href="/contact" className="hover:text-blue-600 transition">CONTACT</Link>
              <Link href="/products" className="hover:text-blue-600 transition">SHOP</Link>
              {user && (
                <button onClick={handleLogout} disabled={loggingOut} className="text-red-500 hover:text-red-700 font-semibold disabled:opacity-50" type="button">
                  {loggingOut ? 'Logging out..' : 'Logout'}
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
      {seeBucket && (
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] h-screen bg-white absolute top-0 right-0 border-slate-200 border-2 transition-all duration-300 flex flex-col items-center z-20">
          <div className="w-full h-[7%] border-b-2 border-slate-300 flex items-center justify-between px-4 text-black">
            <h1 className="text-lg font-semibold">Shopping Cart</h1>
            <button onClick={() => setSeeBucket(false)} type="button"><CancelIcon /></button>
          </div>
          <div className="h-[68%] w-full overflow-auto flex flex-col items-center gap-4 p-4 text-black">
            {cartItems.length > 0 ? (
              cartItems.map((cart) => {
                const price = getPrice(cart);
                const quantity = cart.quantity ?? 1;
                const itemSubtotal = price * quantity;
                return (
                  <div key={cart._id} className="flex w-full border-b border-gray-300 p-2 gap-4">
                    <img src={cart.product_id.cover_image} alt={cart.product_id.name || 'product'} className="w-20 h-24 object-cover rounded" />
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between">
                        <h1 className="font-medium">{cart.product_id.name}</h1>
                        <button onClick={() => handleDelete(cart._id)} type="button"><ClearIcon /></button>
                      </div>
                      <div className="text-gray-500 flex items-center gap-2 flex-wrap">
                        <button onClick={() => { if (quantity > 1) handleQuantityChange(cart.product_id._id, -1); }} disabled={quantity <= 1} className="px-2 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50" type="button">-</button>
                        <span>{quantity}</span>
                        <button onClick={() => { if (quantity < 5) handleQuantityChange(cart.product_id._id, +1); }} disabled={quantity >= 5} className="px-2 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50" type="button">+</button>
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
            {cartItems.length > 0 ? (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-black text-lg font-semibold border p-2 rounded-md mb-3">
                  <span>Total</span>
                  <span>
                    ₹
                    {cartItems.reduce((acc, item) => acc + getPrice(item) * (item.quantity ?? 1), 0).toFixed(2)}
                  </span>
                </div>
                <button onClick={() => router.push('/cart')} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition" type="button">VIEW CART</button>
                <button onClick={() => setSeeBucket(false)} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition" type="button">Continue Shopping</button>
              </div>
            ) : (
              <button onClick={() => { setSeeBucket(false); router.push('/products'); }} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-black hover:text-white transition" type="button">SHOP NOW</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}