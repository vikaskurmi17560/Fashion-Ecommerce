'use client'

import React, { useState } from 'react'
import Navbar from '@/components/UI/Navbar';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import {  Reset } from '@/networks/customernetworks';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

function page() {
  const [seepassword,setSeePassword]=useState<boolean>(false);
  const {register,handleSubmit}=useForm();
  const params=useSearchParams();
  const router=useRouter();
  const token=params.get("token");

  async function handleReset(data:any){
    try{
        const formdata={...data}
        formdata.token=token;
        const res=await Reset(data);
        if(res.success){
            toast.success(res.message);
            router.replace("/login")
        }
    }
    catch(error){
         console.log(error);
    }
  }
  return (
    <div  className="flex flex-col gap-y-32  ">
            <Navbar />
    <div className='flex flex-1 flex-col  items-center justify-center  gap-10'>
      
      <form onSubmit={handleSubmit(handleReset)} className='flex  w-[40vw] border-2 flex-col  items-center justify-center p-4 gap-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]' >
        <div className="flex flex-col gap-2">
          <h1 className='text-2xl text-blue-500 font-bold text-center'>Hey User!</h1>
          <h1 className='text-2xl text-blue-500 font-bold'>Set New Password</h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-5  w-[35vw] ">

          <input {...register("password")} type={seepassword ? "text":"password"} placeholder='Enter New Password' className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2' required />
          <button onClick={()=>setSeePassword(!seepassword)} type='button' className='absolute right-2' >see</button>


          <input {...register("confirm_password")} type={seepassword ? "text" : "password"} placeholder='Enter  New Confirm Password' className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2' required />
          <button onClick={()=>setSeePassword(!seepassword)} type='button' className='absolute right-2' >see</button>

        </div>

        <button type='submit' className='w-full font-bold px-4 mt-4 py-3 text-white bg-gradient-to-r from-blue-500  via-blue-300 to-blue-500'>Login</button>

      </form>
    </div>
    </div>
  )
}

export default page