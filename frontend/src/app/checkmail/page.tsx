'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Password Reset Link Sent!
        </h1>

        <p className="text-gray-600 mb-6">
          We’ve sent a password reset link to your email address. Please check your inbox 
          and follow the instructions to reset your password.
        </p>

        <button
          onClick={() => router.push('/login')}
          className="w-full px-4 py-3 rounded-md text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Page;
