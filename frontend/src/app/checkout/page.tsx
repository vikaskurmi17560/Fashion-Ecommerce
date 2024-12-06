'use client'
import { useEffect, useState } from 'react'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import { handleCheckout } from '@/networks/paymentnetworks';
import { GetAddress } from '@/networks/addressnetworks';


function page() {

  const [login, setLogin] = useState<boolean>(false);
  const [address, setAddress] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAddress();
  }, [])

  const getAddress = async () => {
    const id = localStorage.getItem("user_id");
    try {
      const response = await GetAddress(id);
      console.log("response here",response.data);
  
      if (response.data.success) {
        setAddress(response.data);
        console.log("address here",address);
      }
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <main className="w-full h-auto flex flex-col md:items-center sm:items-center bg-white">
      <Navbar />
      <section className='w-full h-auto flex  items-center justify-center bg-slate-100 '>
        <div className=" lg:w-[85%] w-full h-auto flex flex-col item-center">
          <h1 className="lg:text-7xl md:text-3xl text-xl font-bold text-center text-slate-600 py-3 lg:py-20">
            Checkout
          </h1>

          {login === true &&
            <div className=" flex flex-row lg:border-t-4 border-t-2  lg:text-xl text-[8px] md:text-sm border-black lg:py-10 md:py-5 py-2 gap-2">
              <OpenInBrowserIcon sx={{
                fontSize: { sm: '14px', md: '18px', lg: '24px' },
              }} />
              <h1 className=' text-slate-500'>
                Returning customer?
              </h1>
              <p className=' text-black cursor-pointer' onClick={() => router.replace("/login")}>
                Click here to login
              </p>
            </div>
          }

          <div className=" flex flex-row lg:border-t-4 border-t-2  lg:text-xl md:text-sm text-[8px] border-black lg:py-10 md:py-5 py-2 gap-2">
            <OpenInBrowserIcon sx={{
              fontSize: { sm: '14px', md: '18px', lg: '24px' },
            }} />
            <h1 className='text-slate-500'>
              Have a coupon?
            </h1>
            <p className='text-black cursor-pointer'>
              Click here to enter your code
            </p>
          </div>

          <section className='w-full'>
            <div className="flex flex-col lg:gap-4 md:gap-3 gap-2">
              <h1 className="lg:text-xl md:text-sm text-[12px] text-black">Select Address</h1>
              {
                address && address.length > 0 ? (
                  address.map((add: any, index: number) => (
                    <div className="flex flex-row items-center gap-2 text-black lg:text-xl md:text-sm text-[8px] " key={index}>
                      <input type="radio" name="address" value={index} />
                      <p>`{add.firstname} {add.lastname},{add.street}, {add.city}, {add.state}, {add.pincode}, {add.country}</p>
                    </div>
                  ))
                ) : (
                  <p className=' text-black lg:text-xl md:text-sm text-[8px] '>No addresses available.</p>
                )
              }

            </div>
            <button onClick={() => router.push("/form")} className="bg-blue-500 text-white lg:text-xl md:text-sm text-[10px] font-bold hover:bg-black py-1 text-center px-2 w-fit h-auto rounded-sm">Add New Address</button>
          </section>


          <section className="flex flex-col lg:flex-row lg:py-10 py-3 md:py-6 md:gap-10 gap-4 justify-center items-center lg:gap-20 p-2">

            <div className="lg:w-[40%] w-full h-fit flex flex-col lg:border-2 md:border-1 border-1 border-slate-500">
              <h1 className="lg:text-3xl md:text-xl text-[15px] font-bold text-black lg:px-8 md:px-4 px-1 lg:py-5 md:py-3 py-1">
                Your Order
              </h1>
              <div className="flex flex-col gap-4 w-[100%] h-auto items-center ">
                <div className="lg:w-[90%] md:w-[100%] w-[100%]  h-auto grid grid-cols-2 p-2 ">
                  <div className=" lg:text-xl md:text-sm text-[10px] text-black font-semibold border-b-slate-400 lg:border-b-2 border-b-1 lg:py-8 md:py-4 py-1">
                    Product
                  </div>
                  <div className="">
                    <div className=" lg:text-xl md:text-sm text-[10px] text-black font-semibold border-b-slate-400 lg:border-b-2 border-b-1 lg:py-8 md:py-4 py-1 ">
                      <div className="place-self-end">
                        Subtotal
                      </div>
                    </div>
                  </div>
                  <div className=" lg:text-xl md:text-sm text-[10px] border-b-slate-400  lg:border-b-2 md:border-b-1 border-b-[0.5px] lg:py-8 md:py-4 py-2">
                    Items Details
                  </div>
                  <div className="lg:text-xl md:text-sm text-[10px] border-b-slate-400  lg:border-b-2 md:border-b-1 border-b-[0.5px] lg:py-8 md:py-4 py-2">
                    <div className=" place-self-end">
                      $ 450
                    </div>
                  </div>
                  <div className="lg:text-xl md:text-sm text-[10px] border-b-slate-400  lg:border-b-2 md:border-b-1 border-b-[0.5px] lg:py-8 md:py-4 py-2">
                    Subtotal
                  </div>
                  <div className="lg:text-xl md:text-sm text-[10px] border-b-slate-400  lg:border-b-2 md:border-b-1 border-b-[0.5px] lg:py-8 md:py-4 py-2">
                    <div className=" place-self-end">
                      $ 450
                    </div>
                  </div>
                  <div className=" lg:text-xl md:text-sm text-[10px] border-b-slate-400  lg:border-b-2 md:border-b-1 border-b-[0.5px] lg:py-8 md:py-4 py-2">
                    Total
                  </div>
                  <div className="lg:text-xl md:text-sm text-[10px] border-b-slate-400  lg:border-b-2 md:border-b-1 border-b-[0.5px] lg:py-8 md:py-4 py-2">
                    <div className=" place-self-end">
                      $ 450
                    </div>
                  </div>

                </div>
                <div className="lg:w-[90%] w-full text-black lg:text-xl md:text-sm text-[10px]">
                  <form action="" className="flex flex-col lg:gap-10 md:gap-5 gap-2 lg:py-16 md:py-8 py-4">
                    <div className="flex flex-row ">
                      <input type="radio" id="option" name='alex' />
                      <label id="option" className=" lg:px-4 md:px-2 px-1 w-full">
                        Direct bank transfer
                      </label>
                    </div>
                    <div className="flex flex-row ">
                      <input type="radio" id="option1" name='alex' />
                      <label htmlFor="" id='option2' className=" lg:px-4 md:px-2 px-1 w-full">
                        Check payments
                      </label>
                    </div>
                    <div className="flex flex-row ">
                      <input id="option2" type="radio" name='alex' />
                      <label htmlFor="" id='option2' className=" lg:px-4 md:px-2 px-1 w-full">
                        Cash on delivery
                      </label>
                    </div>
                    <button onClick={() => handleCheckout(15000)} className="hover:bg-black lg:text-3xl md:text-xl text-[15px] rounded-sm font-bold lg:py-2 md:py-1   text-center w-full bg-blue-500 text-white">
                      Pay
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </section>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default page