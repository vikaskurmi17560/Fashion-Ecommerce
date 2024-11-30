'use client'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { useSearchParams } from 'next/navigation';

function page() {
    const search=useSearchParams();
    const id=search.get("razorpay_payment_id")
    return (
        <main className='w-screen h-screen flex flex-col justify-center items-center p-32'>

            <div className="p-10 h-[45%] w-[30%] text-white text-4xl flex flex-col border-2 border-white items-center gap-10 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-400  rounded-3xl shadow-2xl shadow-blue-950">
                <div className="flex flex-col items-center justify-center gap-10">
                    <h1 className='font-bold p-4'> PAYMENT SUCCESS</h1>
                    <p className='text-slate-500 text-sm font-thin'>{id}</p>
                    <div className="h-[45%] w-[45%] text-center">
                    <CheckCircleIcon sx={{ fontSize: 80, color: green[500] }} />

                    </div>
                </div>

            </div>
        </main>
    )
}

export default page