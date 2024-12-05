'use client'
import Navbar from '@/components/UI/Navbar';
import { SignUp } from '@/networks/customernetworks';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

function page() {
    const [seepassword, setSeePassword] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();

    async function handleSignUp(data: any) {
        try {
            const formData = {
                ...data
            }
            formData.profile = data.image[0]
            const response = await SignUp(formData);
            if (response.success) {
                toast.success("Account created successfully");
            }
        }
        catch (error: any) {

            toast.error(error.response.message)
        }
    }
    return (
        <div className="flex flex-col ">
            <Navbar/>
        <div className='flex flex-1 flex-col justify-center items-center gap-10'>
            
            <form onSubmit={handleSubmit(handleSignUp)} className=' flex  w-[40vw] border-2 flex-col  items-center justify-center gap-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 m-28 '>

                <div className="flex flex-col justify-center items-center mb-5">

                    <h1 className='text-2xl text-blue-500 font-bold text-center'>Hey User!</h1>
                    <h1 className='text-2xl text-blue-500 font-bold'>Regester Your Account Here..</h1>

                </div>

                <div className="flex flex-wrap justify-center items-center gap-4 mb-15">

                    <input {...register("name")} type='text' placeholder='Enter your name' className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2' required />

                    <input {...register("email")} type='email' placeholder='Enter email id' className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2' required />


                    <input {...register("phone_no")} type='phone' placeholder='Enter Phoneno.' className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2' required />


                    <select {...register("gender")} name="Gender" required id="gender" className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2'>
                        <option value="Male"  >Select Gender</option>
                        <option value="Male"  >Male</option>
                        <option value="Female" >Female</option>
                        <option value="Other" >Other</option>
                    </select>
                    <input {...register("image")} type='file' className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2' required />

                </div >

                <div  className='relative flex flex-wrap justify-center items-center gap-4 mb-15'>
                    <input {...register("password")} type={seepassword ? "text" : "password"} placeholder='Enter password' className='w-full px-4 text-gray-500 py-3 border-2  rounded-md outline-none focus:ring-blue-200 focus:ring-2' required />
                    <button onClick={() => setSeePassword(!seepassword)} type='button' className='absolute  text-black' >see</button>

                    <input {...register("confirm_password")} type={seepassword ? "text" : 'password'} placeholder='Enter confirm password' className='w-full px-4 text-gray-500 py-3 border-2  rounded-md outline-none focus:ring-blue-200 focus:ring-2' required />
                    <button onClick={() => setSeePassword(!seepassword)} type='button' className='absolute  text-black ' >see</button>
                </div>

                <div className="flex w-full justify-between mt-5 text-gray-500">
                    <Link href={"/signup"} className='text-sm '>New account</Link>
                    <Link href={"/forget"} className='text-sm '>Forgot password?</Link>
                </div>

                <button type='submit' className='w-full font-bold px-4 py-3 text-white bg-gradient-to-r from-blue-500  via-blue-300 to-blue-500 rounded-md'>Submit & Login</button>

            </form>

        </div>
        </div>
    )
}

export default page