'use client'
import React from 'react'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import { handleCheckout } from '@/networks/paymentnetworks';
const Countries = [
  "China",
  "India",
  "United States",
  "Indonesia",
  "Pakistan",
  "Nigeria",
  "Brazil",
  "Bangladesh",
  "Russia",
  "Mexico",
  "Japan",
  "Ethiopia",
  "Philippines",
  "Egypt",
  "Vietnam",
  "DR Congo",
  "Turkey",
  "Iran",
  "Germany",
  "Thailand",
];
const States = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

function page() {

  const router = useRouter();

  return (
    <main className="w-full h-auto flex flex-col md:items-center sm:items-center bg-white">
      <Navbar />
      <section className='w-full h-auto flex  items-center justify-center bg-slate-100 '>
      <div className=" lg:w-[85%] w-full h-auto flex flex-col item-center">
        <h1 className="lg:text-7xl md:text-3xl text-xl font-bold text-center text-slate-600 py-3 lg:py-20">
          Checkout
        </h1>

        <div className=" flex flex-row lg:border-t-4 border-t-2  lg:text-xl text-[8px] md:text-sm border-black lg:py-10 md:py-5 py-2 gap-2">
        <OpenInBrowserIcon sx={{
        fontSize: {sm:'14px', md: '18px', lg: '24px' }, 
      }}  />
          <h1 className=' text-slate-500'>
            Returning customer?
          </h1>
          <p className=' text-black cursor-pointer' onClick={() => router.replace("/login")}>
            Click here to login
          </p>
        </div>

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
        <section className="flex flex-col lg:flex-row lg:py-10 py-3 md:py-6 md:gap-10 gap-4  lg:gap-20 p-2">

          <section className="flex flex-col lg:w-[55%] w-full">
            <form action="" className="w-full lg:text-xl md:text-sm text-[10px] h-auto xl:py-6 md:py-3 py-1">
              <h1 className="text-black lg:text-3xl md:text-xl text-[15px] font-extrabold">
                Billing details
              </h1>
              <div className="flex lg:flex-row flex-col py-4 lg:px-2 px-1 lg:gap-4 md:gap-2 gap-1">
                <div className="w-full gap-4 flex flex-col">
                  <label className='text-slate-600 flex flex-row gap-1'>
                    <h1 className="text-black">
                      First Name
                    </h1>
                    <p className="text-red-500">
                      *
                    </p>
                  </label>
                  <input type="text" className='w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md' />
                </div>
                <div className="w-full lg:gap-4 gap-2  flex flex-col">
                  <label className='text-slate-600  flex flex-row  gap-1 '>
                    <h1 className="text-black">
                      Last Name
                    </h1>
                    <p className="text-red-500">
                      *
                    </p>
                  </label>
                  <input type="text" className='w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md' />
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 ">
                  <h1 className="text-black">
                    Company name (optional)
                  </h1>
                </label>
                <input type="text" className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
              </div>

              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 ">
                  <h1 className="text-black">
                    Country / Region
                  </h1>
                </label>
                <select name="country" id="country" className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md">
                  <option value="" disabled selected >
                    Select your country....
                  </option>
                  {Countries.map((country, index) => (
                    <option key={index} value={country} >
                      {country}
                    </option>
                  ))}
                </select>
              </div>



              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600  flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Street address
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <input type="text" placeholder='House number and street name' className=" w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
                <input type="text" placeholder='Apartment,suite,unit,etc.(optional)' className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Town/City
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <input type="text" className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 flex flex-row gap-1 ">
                  <h1 className="text-black">
                    State
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <select name="state" id="state" className=" w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md">
                  <option value="" disabled selected>
                    Select your state....
                  </option>
                  {

                    States.map((state, index) => {
                      return (
                        <option value={state} key={index}>
                          {state}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Pin Code
                  </h1>
                  <p className="text-red-500">
                    *</p>
                </label>
                <input type="text" className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600  flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Phone
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <input type="phone" className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600  flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Email Address
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <input type="email" className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
              </div>
            </form>
            <div className="flex flex-col gap-8 px-2">
              <h1 className="text-black lg:text-3xl md:text-xl text-[15px] font-extrabold">Additional information</h1>
              <div className="lg:text-xl md:text-sm text-[10px] text-slate-500 flex flex-col gap-2">
                <h1 className='text-black lg:text-xl md:text-sm text-[10px]'>Order notes (optional)</h1>
                <textarea name="" id="" rows={4} className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" >
                  Order notes (optional)
                </textarea>
              </div>
            </div>
          </section>
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
                  <button onClick={()=>handleCheckout(15000)} className="lg:text-3xl md:text-xl text-[15px] font-bold lg:py-6 md:py-8 py-2  text-center w-full bg-blue-500 text-white">
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