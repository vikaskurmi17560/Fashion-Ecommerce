'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState , Suspense} from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@mui/material';

function SuccessContent() {
  const search = useSearchParams();
  const router = useRouter();
  const [id, setId] = useState<any>(0);
  useEffect(() => {
    const ID = search.get('razorpay_payment_id');
    setId(ID);
  }, [search])
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/products');
    }, 1000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md flex flex-col items-center animate-fade-in">
        <CheckCircleIcon sx={{ fontSize: 100, color: green[500] }} />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
          Payment Successful!
        </h1>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Thank you for your payment.
        </p>
        {id && (
          <p className="text-xs text-gray-500 mt-1 break-all text-center">
            Payment ID: <span className="font-mono">{id}</span>
          </p>
        )}
        <Button
          variant="contained"
          color="success"
          className="mt-6"
          onClick={() => router.push('/')}
        >
          Go to Home
        </Button>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-xl">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}