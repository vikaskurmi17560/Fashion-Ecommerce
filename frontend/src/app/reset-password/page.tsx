'use client'

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import Navbar from '@/components/UI/Navbar';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Reset } from '@/networks/customernetworks';
import { useRouter } from 'next/router';

interface ResetFormData {
  password: string;
  confirm_password: string;
}

function Page() {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<ResetFormData>();
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  async function handleReset(data: ResetFormData) {
    try {
      const formdata = { ...data, token };
      const res = await Reset(formdata);
      if (res.success) {
        toast.success(res.message);
        router.replace("/login");
      } else {
        toast.error(res.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex flex-col gap-y-32">
      <Navbar />
      <div className='flex flex-1 flex-col items-center justify-center gap-10'>
        <form onSubmit={handleSubmit(handleReset)} className='flex w-[40vw] border-2 flex-col items-center justify-center p-4 gap-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative'>

          <div className="flex flex-col gap-2">
            <h1 className='text-2xl text-blue-500 font-bold text-center'>Hey User!</h1>
            <h1 className='text-2xl text-blue-500 font-bold'>Set New Password</h1>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 w-[35vw]">
            <div className="relative w-full">
              <input
                {...register("password")}
                type={seePassword ? "text" : "password"}
                placeholder='Enter New Password'
                className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2'
                required
              />
              <button
                onClick={() => setSeePassword(!seePassword)}
                type='button'
                className='absolute right-2 top-3 text-sm text-blue-500'
              >
                {seePassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="relative w-full">
              <input
                {...register("confirm_password")}
                type={seePassword ? "text" : "password"}
                placeholder='Confirm New Password'
                className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2'
                required
              />
              <button
                onClick={() => setSeePassword(!seePassword)}
                type='button'
                className='absolute right-2 top-3 text-sm text-blue-500'
              >
                {seePassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type='submit'
            className='w-full font-bold px-4 mt-4 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
