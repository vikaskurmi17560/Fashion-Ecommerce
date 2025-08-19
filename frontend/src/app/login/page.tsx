'use client';

import Navbar from '@/components/UI/Navbar';
import { LogIn } from '@/networks/customernetworks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
}

function Page() {
  const [seePassword, setSeePassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogIN(data: LoginFormData) {
    setLoading(true);
    try {
      const response = await LogIn(data);
      if (response.success) {
        toast.success('Account logged in successfully');
        router.replace('/profile');
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit(handleLogIN)}
          className="flex w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] border border-gray-200 flex-col items-center p-6 gap-6 rounded-lg shadow-lg bg-white"
        >
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-blue-500">Hey User!</h1>
            <p className="text-gray-600 mt-1">Login to your account</p>
          </div>

          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            autoComplete="username"
            required
            className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300 transition"
            disabled={loading}
          />

          <div className="relative w-full">
            <input
              {...register('password')}
              type={seePassword ? 'text' : 'password'}
              placeholder="Enter Password"
              autoComplete="current-password"
              maxLength={16}
              required
              className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300 transition"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute right-3 top-3 text-sm text-blue-500 hover:underline"
            >
              {seePassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="flex w-full justify-between text-gray-500 text-sm">
            <Link href="/signup" className="hover:underline">
              New account
            </Link>
            <Link href="/forget" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold px-4 py-3 text-white rounded-md transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 hover:opacity-90'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;