'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Navbar from '@/components/UI/Navbar';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Reset } from '@/networks/customernetworks';

interface ResetFormData {
  password: string;
  confirm_password: string;
}

function Page() {
  const [seePassword, setSeePassword] = useState(false);
  const { register, handleSubmit } = useForm<ResetFormData>();
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token');

  async function handleReset(data: ResetFormData) {
    try {
      const formData = { ...data, token };
      const res = await Reset(formData);

      if (res.success) {
        toast.success(res.message);
        router.replace('/login');
      } else {
        toast.error(res.message || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit(handleReset)}
          className="flex w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] border border-gray-200 flex-col items-center p-6 gap-6 rounded-lg shadow-lg bg-white"
        >

          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-blue-500">Hey User!</h1>
            <p className="text-gray-600 mt-1">Set your new password</p>
          </div>


          <div className="relative w-full">
            <input
              {...register('password')}
              type={seePassword ? 'text' : 'password'}
              placeholder="Enter New Password"
              required
              className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute right-3 top-3 text-sm text-blue-500"
            >
              {seePassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="relative w-full">
            <input
              {...register('confirm_password')}
              type={seePassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              required
              className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute right-3 top-3 text-sm text-blue-500"
            >
              {seePassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full font-bold px-4 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-md hover:opacity-90 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
