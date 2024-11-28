'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import FitbitIcon from '@mui/icons-material/Fitbit';
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/navigation';
import useCart from '@/hook/useCart';
function Navbar() {
  const router = useRouter();
  const [profileimg, SetProfileImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [seebucket, setSeeBucket] = useState<boolean>(false);
  const { carts, deleteCart, getCarts } = useCart();
  
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
    <div className=" z-20 relative w-full bg-black/10">

      <div className="hidden md:flex items-center justify-between h-32  text-white font-semibold px-6">
        <div className="flex items-center gap-20 text-white p-3">
          <h1 className="text-lg">
            <Link href="/" className='text-white text-4xl font-bold hover:text-blue-200 '><FitbitIcon /> LOGO</Link>
          </h1>

          <div className="flex gap-8 text-xl">
            <Link href="/products" className='text-white hover:text-blue-200 '>EVERYTHING</Link>
            <Link href="#" className='text-white hover:text-blue-200 '>WOMEN</Link>
            <Link href="#" className='text-white hover:text-blue-200 '>MEN</Link>
            <Link href="#" className='text-white hover:text-blue-200 '>ACCESSORIES</Link>
            <Link href="/product" className='text-white'>try</Link>

          </div>
        </div>

        <div className="hidden md:flex items-center justify-between h-20 px-6 gap-8 text-xl">
          <Link href="/about" className='text-white hover:text-blue-200 '>ABOUT</Link>
          <Link href="/contact" className='text-white hover:text-blue-200 '>CONTACT US</Link>
          <Link href="#" className='text-white hover:text-blue-200  ' onClick={() => {
            setSeeBucket(!seebucket)
            getCarts();
          }}>
            <ShoppingCartIcon />
          </Link>

          {
            (name || profileimg) ? <div className="">
              <h1 className='text-white'>{name}</h1>
              {profileimg && <img src={profileimg} alt="img" className='rounded-full h-10 w-10' />}
            </div> :
              <Link href="/login" className='text-white hover:text-blue-200 '>SIGNIN/SIGNUP</Link>
          }
        </div>
      </div>
      {seebucket === true &&
        <div className="w-[40%] h-screen bg-white  absolute top-0 right-0  border-slate-200 border-2 transition-all duration-300 flex flex-col items-center">


          <div className='w-[100%] h-[7%] border-b-2 border-slate-300 flex flex-col justify-between items-center  top-0 '>

            <div className='w-[90%] flex flex-row justify-between items-center my-2 '>

              <h1 className='text-xl font-semibold w-auto text-center'>Shopping Cart</h1>
              <div className="p-1 w-auto ">
                <p className=' p-1 w-auto cursor-pointer' onClick={() => {
                  setSeeBucket(false)
                  
                }}>
                  <CancelIcon />
                </p>
              </div>

            </div>

          </div>



          <div className="h-[68%] w-[100%]  sticky overflow-auto flex flex-col items-center gap-4 ">

            {
              carts && carts.map((cart: any) => (
                <div className="h-auto p-2 w-[90%] flex flex-row gap-2 my-4 border-b-slate-300 border-b-2" key={cart._id}>

                  <img src={cart.product_id.cover_image} alt="img" className='max-w-20 max-h-30' />

                  <div className=" h-auto flex flex-col gap-2 w-full">
                    <div className='flex flex-row justify-between w-full p-2'>
                      <h1 className='text-xl'>
                        {cart.product_id.name}
                      </h1>
                      <button className='text-slate-500' onClick={() => {
                        deleteCart(cart._id)

                      }}><ClearIcon /></button>
                    </div>

                    <div className="  flex flex-row ">
                      <h1 className='text-slate-500 text-xl  flex flex-row '>
                        <p className='p-1'>{cart.quantity} </p>
                        <p className='p-1'>x</p>
                      </h1>
                      <h1 className='text-slate-500 text-xl  flex flex-row '>
                        <p className='p-1'>$</p>
                        <p className='p-1'>{cart.total_price}</p>
                      </h1>

                    </div>
                  </div>
                </div>
              ))
            }
          </div >

         

            {
              carts.length > 0 ? (

                <div className='w-[100%] h-[25%] flex flex-col items-center bottom-0 '>

                <div className="w-[100%] border-y-2 border-slate-300 flex flex-col items-center ">
                  <div className=' w-[90%] flex flex-row justify-between p-1'>
                    <h1 className='text-xl font-semibold w-auto p-1 text-center'>Subtotal:</h1>
                    <p className='text-xl p-1 w-auto '>$155</p>
                  </div>
                </div>
                <div className="w-[90%] flex flex-col gap-5 py-5 my-2">
                  <button
                    className="w-full h-auto text-xl text-white font-bold bg-blue-500 px-5 py-3 hover:bg-black focus:bg-blue-300 transition-all duration-300"
                    onClick={() => router.push("/cart")}
                  >
                    VIEW CART
                  </button>
                </div>
                </div>
              ) : (
                <div className="w-[90%] mt-24">
                  <button
                    className="w-full text-xl text-white font-bold bg-blue-500 px-5 py-3 hover:bg-black focus:bg-blue-300 transition-all duration-300"
                    onClick={() => router.push("/products")}
                  >
                    SHOP NOW
                  </button>
                </div>
              )
            }


         

        </div>
      }
    </div>
  )
}

export default Navbar