'use client';
import Navbar from '@/components/UI/Navbar';
import { Forgot, ForgotFormData } from '@/networks/customernetworks';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Page() {
  const [mounted, setMounted] = useState(false);
  const { register, handleSubmit } = useForm<ForgotFormData>();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleForgot(data: ForgotFormData) {
    try {
      const response = await Forgot(data);
      if (response.success) {
        toast.success(response.message);
        router.replace("/checkmail");
      } else {
        toast.error(response.message || "Something went wrong.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    }
  }

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-y-16 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-4">
        <form
          onSubmit={handleSubmit(handleForgot)}
          className="flex w-full max-w-md border border-gray-200 flex-col items-center justify-center p-6 gap-4 rounded-md shadow-md bg-white"
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl text-blue-500 font-bold">Hey User!</h1>
            <p className="text-gray-700">Enter your linked email to reset your password</p>
          </div>

          <input
            {...register("email")}
            type="email"
            placeholder="Enter Email"
            className="w-full px-4 text-gray-500 py-3 border rounded-md outline-none focus:ring-blue-200 focus:ring-2"
            required
          />

          <button
            type="submit"
            className="w-full font-bold px-4 mt-4 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 rounded-md"
          >
            Send Reset-Password Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;