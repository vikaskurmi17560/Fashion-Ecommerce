'use client'
import React from 'react'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
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
    <main className="w-screen h-auto ">
      <Navbar />
      <section className='w-screen h-auto flex  item-center justify-center bg-slate-100 '>
      <div className=" w-[85%] h-auto flex flex-col ">
        <h1 className="text-7xl font-bold text-center text-slate-600 py-20">
          Checkout
        </h1>

        <div className=" flex flex-row border-t-4 border-black py-10 gap-2">
          <OpenInBrowserIcon />
          <h1 className='text-xl text-slate-500'>
            Returning customer?
          </h1>
          <p className='text-xl text-black cursor-pointer' onClick={() => router.replace("/login")}>
            Click here to login
          </p>
        </div>

        <div className=" flex flex-row border-t-4 border-black py-10 gap-2">
          <OpenInBrowserIcon />
          <h1 className='text-xl text-slate-500'>
            Have a coupon?
          </h1>
          <p className='text-xl text-black cursor-pointer'>
            Click here to enter your code
          </p>
        </div>
        <section className="flex flex-row py-10 gap-20 p-2">

          <section className="flex flex-col w-[55%]">
            <form action="" className="w-full h-auto py-6">
              <h1 className="text-black text-3xl font-extrabold">
                Billing details
              </h1>
              <div className="flex flex-row py-4 px-2 gap-4">
                <div className="w-[100%] gap-4 flex flex-col">
                  <label className='text-slate-600 text-xl flex flex-row   gap-1'>
                    <h1 className="text-black">
                      First Name
                    </h1>
                    <p className="text-red-500">
                      *
                    </p>
                  </label>
                  <input type="text" className='text-xl border p-3 focus:border-dotted focus:border-slate-700 required  rounded-md' />
                </div>
                <div className="w-[100%] gap-4 flex flex-col">
                  <label className='text-slate-600 text-xl flex flex-row  gap-1 '>
                    <h1 className="text-black">
                      Last Name
                    </h1>
                    <p className="text-red-500">
                      *
                    </p>
                  </label>
                  <input type="text" className='text-xl border p-3 focus:border-dotted focus:border-slate-700 required  rounded-md' />
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 text-xl">
                  <h1 className="text-black">
                    Company name (optional)
                  </h1>
                </label>
                <input type="text" className=" w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700   rounded-md" />
              </div>

              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 text-xl">
                  <h1 className="text-black">
                    Country / Region
                  </h1>
                </label>
                <select name="country" id="country" className="w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700 text-slate-600  rounded-md">
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
                <label className="text-slate-600 text-xl flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Street address
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <input type="text" placeholder='House number and street name' className=" rounded-md w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700 required" />
                <input type="text" placeholder='Apartment,suite,unit,etc.(optional)' className=" w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700 required" />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 text-xl flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Town/City
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <input type="text" className=" rounded-md w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700 required" />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 text-xl flex flex-row gap-1 ">
                  <h1 className="text-black">
                    State
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <select name="state" id="state" className=" rounded-md w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700 required text-slate-600">
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
                <label className="text-slate-600 text-xl flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Pin Code
                  </h1>
                  <p className="text-red-500">
                    *</p>
                </label>
                <input type="text" className=" rounded-md w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700 required" />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 text-xl flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Phone
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <input type="phone" className=" rounded-md w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700 required" />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <label className="text-slate-600 text-xl flex flex-row gap-1 ">
                  <h1 className="text-black">
                    Email Address
                  </h1>
                  <p className="text-red-500">
                    *
                  </p>
                </label>
                <input type="email" className=" rounded-md w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700 required" />
              </div>
            </form>
            <div className="flex flex-col gap-8 px-2">
              <h1 className="text-3xl font-bold text-black py-2">Additional information</h1>
              <div className="text-xl text-slate-500 flex flex-col gap-2">
                <h1 className='text-black text-xl'>Order notes (optional)</h1>
                <textarea name="" id="" rows={4} className=" rounded-md w-[100%] text-xl border p-3 focus:border-dotted focus:border-slate-700" >
                  Order notes (optional)
                </textarea>
              </div>
            </div>
          </section>
          <div className="w-[40%] h-fit flex flex-col border-2 border-slate-500">
            <h1 className="text-3xl font-bold text-black px-8 py-5">
              Your Order
            </h1>
            <div className="flex flex-col gap-4 w-[100%] h-auto items-center ">
              <div className="w-[90%] h-auto grid grid-cols-2 p-2 ">
                <div className=" text-xl text-black font-semibold border-b-slate-400 border-b-2 py-8">
                  Product
                </div>
                <div className="">
                  <div className=" text-xl text-black font-semibold border-b-slate-400 border-b-2 py-8 ">
                    <div className="place-self-end">
                      Subtotal
                    </div>
                  </div>
                </div>
                <div className=" text-xl border-b-slate-400 border-b-2  py-8">
                  Items Details
                </div>
                <div className="text-slate-600 text-xl border-b-slate-400 border-b-2 py-8">
                  <div className=" place-self-end">
                    $ 450
                  </div>
                </div>
                <div className=" text-xl text-slate-600 border-b-slate-400 border-b-2 py-8">
                  Subtotal
                </div>
                <div className="text-slate-600 text-xl border-b-slate-400 border-b-2 py-8">
                  <div className=" place-self-end">
                    $ 450
                  </div>
                </div>
                <div className=" text-xl text-slate-600 border-b-slate-400 border-b-2 py-8">
                  Total
                </div>
                <div className="text-slate-600 text-xl border-b-slate-400 border-b-2 py-8">
                  <div className=" place-self-end">
                    $ 450
                  </div>
                </div>

              </div>
              <div className="w-[90%] text-black text-xl">
                <form action="" className="flex flex-col gap-10 py-16">
                  <div className="flex flex-row ">
                    <input type="radio" id="option" name='alex' />
                    <label id="option" className=" px-4">
                      Direct bank transfer
                    </label>
                  </div>
                  <div className="flex flex-row ">
                    <input type="radio" id="option1" name='alex' />
                    <label htmlFor="" id='option2' className=" px-4">
                      Check payments
                    </label>
                  </div>
                  <div className="flex flex-row ">
                    <input id="option2" type="radio" name='alex' />
                    <label htmlFor="" id='option2' className=" px-4">
                      Cash on delivery
                    </label>
                  </div>
                  <button className="text-3xl font-bold py-6 text-center w-full bg-blue-500 text-white">
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