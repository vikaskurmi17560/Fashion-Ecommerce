'use client';

import Navbar from '@/components/UI/Navbar';
import { LogIn } from '@/networks/customernetworks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Page() {
  const [seepassword, setSeePassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogIN(data: any) {
    try {
      const response = await LogIn(data);
      if (response.success) {
        toast.success("Account Login successfully");
        localStorage.setItem("eco_token", response.token);
        localStorage.setItem("eco_user_id", response.user._id);
        localStorage.setItem("eco_user_name", response.user.name);
        localStorage.setItem("eco_user_email", response.user.email);
        localStorage.setItem("eco_phone", response.user.phone_no);
        localStorage.setItem("eco_user_image", response.user.profile);
        router.replace("/");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  }

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-y-32">
      <Navbar />
      <div className="flex flex-1 flex-col justify-center items-center gap-10">
        <form
          onSubmit={handleSubmit(handleLogIN)}
          className="flex w-[90vw] md:w-[40vw] border-2 flex-col items-center justify-center p-4 gap-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <div className="flex flex-col mb-10 text-center">
            <div className="text-2xl font-bold text-blue-500">Hey User!</div>
            <div className="text-xl font-semibold text-blue-500">
              Login to your Account
            </div>
          </div>

          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2"
            required
          />

          <div className="relative flex w-full items-center gap-2">
            <input
              {...register("password")}
              type={seepassword ? "text" : "password"}
              maxLength={16}
              required
              placeholder="Enter Password"
              className="w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2"
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seepassword)}
              className="absolute right-2 text-blue-500 text-sm"
            >
              {seepassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex w-full justify-between mt-5 text-gray-500 text-sm">
            <Link href="/signup" className="hover:underline">
              New account
            </Link>
            <Link href="/forget" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full font-bold px-4 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
