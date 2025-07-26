'use client';
import Navbar from '@/components/UI/Navbar';
import { SignUp } from '@/networks/customernetworks';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Page() {
  const [seePassword, setSeePassword] = useState(false);
  const { register, handleSubmit } = useForm();

  async function handleSignUp(data: any) {
    try {
      const formData = new FormData();

      for (const key in data) {
        if (key === 'profile' && data[key]?.length > 0) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await SignUp(formData);

      if (response.success) {
        toast.success('Account created successfully');
      } else {
        toast.error(response.message || 'Signup failed');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div className="flex flex-col gap-y-32 min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col justify-center items-center gap-10">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex w-[90vw] md:w-[40vw] border-2 flex-col items-center justify-center p-4 gap-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white"
        >
          <div className="flex flex-col mb-10 text-center">
            <div className="text-2xl font-bold text-blue-500">Welcome!</div>
            <div className="text-xl font-semibold text-blue-500">
              Register Your Account Here
            </div>
          </div>

          <input
            {...register('name')}
            placeholder="Enter your name"
            required
            className="w-full px-4 py-3 border-2 rounded-md text-gray-500 outline-none focus:ring-blue-200 focus:ring-2"
          />

          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border-2 rounded-md text-gray-500 outline-none focus:ring-blue-200 focus:ring-2"
          />

          <input
            {...register('phone_no')}
            type="tel"
            placeholder="Enter your phone number"
            required
            className="w-full px-4 py-3 border-2 rounded-md text-gray-500 outline-none focus:ring-blue-200 focus:ring-2"
          />

          <select
            {...register('gender')}
            required
            defaultValue=""
            className="w-full px-4 py-3 border-2 rounded-md text-gray-500 outline-none focus:ring-blue-200 focus:ring-2"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            {...register('profile')}
            type="file"
            required
            className="w-full px-4 py-3 border-2 rounded-md text-gray-500 outline-none focus:ring-blue-200 focus:ring-2"
          />

          <div className="relative flex w-full items-center gap-2">
            <input
              {...register('password')}
              type={seePassword ? 'text' : 'password'}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 border-2 rounded-md text-gray-500 outline-none focus:ring-blue-200 focus:ring-2"
              maxLength={16}
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute right-2 text-blue-500 text-sm"
            >
              {seePassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="relative flex w-full items-center gap-2">
            <input
              {...register('confirm_password')}
              type={seePassword ? 'text' : 'password'}
              placeholder="Confirm password"
              required
              className="w-full px-4 py-3 border-2 rounded-md text-gray-500 outline-none focus:ring-blue-200 focus:ring-2"
              maxLength={16}
            />
          </div>

          <button
            type="submit"
            className="w-full font-bold px-4 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 rounded-md"
          >
            Submit & Register
          </button>

          <div className="flex w-full justify-between mt-5 text-gray-500 text-sm">
            <Link href="/login" className="hover:underline">
              Already have an account?
            </Link>
            <Link href="/forget" className="hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
