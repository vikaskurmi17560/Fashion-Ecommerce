'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import FitbitIcon from '@mui/icons-material/Fitbit';
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import { usePathname, useRouter } from 'next/navigation';
import useCart from '@/hook/useCart';

const navigation = [
  '/',
  '/about',
  '/contact'
]

function Navbar() {
  const router = useRouter();
  const [profileimg, SetProfileImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [seebucket, setSeeBucket] = useState<boolean>(false);
  const { carts, deleteCart, getCarts } = useCart();
  const path = usePathname();

  useEffect(() => {
    const user_name = localStorage.getItem("user_name");
    const user_img = localStorage.getItem("user_image");

    if (user_name) {
      setName(user_name);
    }
    if (user_img) {
      SetProfileImg(user_img);
    }

  }, [])


  return (
    <div
      className={` px-1 z-20 relative w-full ${navigation.includes(path) ? "bg-black/10 text-white" : "bg-white text-black"
        }`}
    >
      <div className=" hidden md:flex  items-center justify-between lg:h-32 md:h-24 h-0 font-semibold lg:px-6 md:px-2 px-1">
        <div className="flex items-center lg:gap-x-20 md:gap-x-2 lg:p-3 md:p-0">
          <h1>
            <Link
              href="/"
              className="lg:text-4xl md:text-sm font-bold hover:text-blue-200"
            >
              <FitbitIcon /> LOGO
            </Link>
          </h1>
          <div className="flex lg:gap-8 md:gap-2 lg:text-xl md:text-sm">
            <Link href="/products" className="hover:text-blue-200">
              EVERYTHING
            </Link>
            <Link href="#" className="hover:text-blue-200">
              WOMEN
            </Link>
            <Link href="#" className="hover:text-blue-200">
              MEN
            </Link>
            <Link href="#" className="hover:text-blue-200">
              ACCESSORIES
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between h-20 lg:px-6 md:px-0 lg:gap-x-8 md:gap-x-2 lg:text-xl md:text-sm">
          <Link href="/about" className="hover:text-blue-200">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-blue-200">
            CONTACT
          </Link>
          {!path.split(`/`).includes(`cart`) && (
            <Link
              href="#"
              className="hover:text-blue-200"
              onClick={() => {
                getCarts();
                setSeeBucket(!seebucket);
              }}
            >
              <ShoppingCartIcon
                sx={{
                  fontSize: { sm: "14px", md: "18px", lg: "24px" },
                }}
              />
            </Link>
          )}
          {name || profileimg ? (
            <div className="flex lg:gap-4 md:gap-2 items-center">
              <h1>{name}</h1>
              {profileimg && profileimg !== "null" ? (
                <img
                  src={profileimg}
                  className="rounded-full lg:h-14 lg:w-14 md:h-8 md:w-8"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dplwgsngu/image/upload/v1732371530/uvs9ln32r2h5p3cuxeav.jpg"
                  className="rounded-full lg:h-14 lg:w-14 md:h-8 md:w-8"
                />
              )}
            </div>
          ) : (
            <Link href="/login" className="text-white hover:text-blue-200">
              SIGNIN/SIGNUP
            </Link>
          )}
        </div>
      </div>
      {seebucket === true && (
        <div className="w-[40%] h-screen bg-white absolute top-0 right-0 border-slate-200 border-2 transition-all duration-300 flex flex-col items-center">
          <div className="w-[100%] h-[7%] border-b-2 border-slate-300 flex flex-col justify-between items-center top-0">
            <div className="w-[90%] flex flex-row justify-between items-center my-2">
              <h1 className="lg:text-xl md:text-sm font-semibold w-auto text-center">
                Shopping Cart
              </h1>
              <div className="p-1 w-auto">
                <p
                  className="p-1 w-auto cursor-pointer"
                  onClick={() => {
                    setSeeBucket(false);
                  }}
                >
                  <CancelIcon />
                </p>
              </div>
            </div>
          </div>
          <div className="h-[68%] w-[100%] sticky overflow-auto flex flex-col items-center gap-4">
            {carts &&
              carts.map((cart: any) => (
                <div
                  className="h-auto p-2 w-[90%] flex flex-row gap-2 lg:my-4 md:my-2 border-b-slate-300 border-b-2"
                  key={cart._id}
                >
                  <img
                    src={cart.product_id.cover_image}
                    alt="img"
                    className="max-w-20 max-h-30"
                  />
                  <div className="h-auto flex flex-col gap-2 w-full">
                    <div className="flex flex-row justify-between w-full p-2">
                      <h1 className="lg:text-xl md:text-sm">
                        {cart.product_id.name}
                      </h1>
                      <button
                        className="text-slate-500"
                        onClick={() => {
                          deleteCart(cart._id);
                        }}
                      >
                        <ClearIcon />
                      </button>
                    </div>
                    <div className="flex flex-row">
                      <h1 className="text-slate-500 lg:text-xl md:text-sm flex flex-row">
                        <p className="p-1">{cart.quantity}</p>
                        <p className="p-1">x</p>
                      </h1>
                      <h1 className="text-slate-500 lg:text-xl md:text-sm flex flex-row">
                        <p className="p-1">$</p>
                        <p className="p-1">{cart.total_price}</p>
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {carts.length > 0 ? (
            <div className="w-[100%] h-[25%] flex flex-col items-center bottom-0">
              <div className="w-[100%] border-y-2 border-slate-300 flex flex-col items-center">
                <div className="w-[90%] flex lg:text-xl md:text-sm flex-row justify-between p-1">
                  <h1 className="font-semibold w-auto p-1 text-center">
                    Subtotal:
                  </h1>
                  <p className="p-1 w-auto">$155</p>
                </div>
              </div>
              <div className="w-[90%] flex flex-col lg:gap-5 md:gap-2 lg:py-5 md:py-2 lg:my-2">
                <button
                  className="w-full h-auto lg:text-xl md:text-sm font-bold bg-blue-500 lg:px-5 md:px-2 lg:py-3 md:py-1 hover:bg-black hover:text-white focus:bg-blue-300 transition-all duration-300"
                  onClick={() => {
                    router.push("/cart");
                  }}
                >
                  VIEW CART
                </button>
                <button
                  className="w-full lg:text-xl md:text-sm font-bold bg-blue-500 lg:px-5 md:px-2 lg:py-3 md:py-1 hover:bg-black hover:text-white focus:bg-blue-300 transition-all duration-300"
                  onClick={() => {
                    setSeeBucket(!seebucket);
                  }}
                >
                  Shopping Continue
                </button>
              </div>
            </div>
          ) : (
            <div className="w-[90%] mt-24">
              <button
                className="w-full lg:text-xl md:text-sm font-bold bg-blue-500 lg:px-5 md:px-2 lg:py-3 md:py-1 hover:bg-black hover:text-white focus:bg-blue-300 transition-all duration-300"
                onClick={() => {
                  setSeeBucket(!seebucket);
                }}
              >
                SHOP NOW
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

}

export default Navbar