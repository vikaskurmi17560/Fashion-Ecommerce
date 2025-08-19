'use client';
import Navbar from '@/components/UI/Navbar';
import { SignUp } from '@/networks/customernetworks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Page() {
  const [seePassword, setSeePassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSignUp(data: any) {
    setLoading(true);
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
        router.replace('/login');
      } else {
        toast.error(response.message || 'Signup failed');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="flex flex-1 flex-col justify-center items-center px-4 py-8">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] border border-gray-200 flex-col items-center p-6 gap-4 rounded-lg shadow-lg bg-white"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-500">Welcome!</h1>
            <p className="text-gray-600 mt-1">Register your account here</p>
          </div>

          <input
            {...register('name')}
            placeholder="Enter your name"
            required
            disabled={loading}
            className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            required
            disabled={loading}
            className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            {...register('phone_no')}
            type="tel"
            placeholder="Enter your phone number"
            required
            autoComplete="tel"
            disabled={loading}
            className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
          />

          <select
            {...register('gender')}
            required
            defaultValue=""
            disabled={loading}
            className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            {...register('profile')}
            type="file"
            required
            disabled={loading}
            className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
          />

          <div className="relative w-full">
            <input
              {...register('password')}
              type={seePassword ? 'text' : 'password'}
              placeholder="Enter password"
              required
              autoComplete="new-password"
              maxLength={16}
              disabled={loading}
              className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute right-3 top-3 text-blue-500 text-sm"
            >
              {seePassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <input
            {...register('confirm_password')}
            type={seePassword ? 'text' : 'password'}
            placeholder="Enter password"
            required
            autoComplete="confirm-password"
            maxLength={16}
            disabled={loading}
            className="w-full px-4 py-3 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold px-4 py-3 text-white rounded-md transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 hover:opacity-90'
            }`}
          >
            {loading ? 'Registering...' : 'Submit & Register'}
          </button>

          <div className="flex w-full flex-col sm:flex-row justify-between mt-5 text-gray-500 text-sm text-center sm:text-left gap-2">
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