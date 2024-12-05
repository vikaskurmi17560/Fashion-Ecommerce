import React from 'react'
import Navbar from '../UI/Navbar'

function home() {
    return (

        <div className="w-full  z-10 flex bg-fixed h-screen flex-col  bg-[url('https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/home-new-bg-free-img.jpg')] items-center bg-cover bg-no-repeat bg-center before:content-[''] before:absolute before:inset-0  before:block before:bg-gradient-to-tl before:from-black/50  before:to-sky-600 before:opacity-75  before:z-[-5] ">
            <Navbar />
            <div className=" flex  flex-col px-16  w-[95%] gap-5 py-20 ">
                <div className=' w-[50%] py-16 flex flex-col text-6xl text-White font-semibold   text-white flex-wrap gap-6 '>
                    <h1 >Raining Offers For</h1>
                    <h1 >Hot Summer!</h1>
                </div>
                <div className=' w-[50%] h-20 items-center text-white text-2xl font-semibold '>
                    <h1 >25% off on all Products</h1>
                </div>
                <div className='flex flex-row gap-4 text-xl font-semibold'>
                    <button className='px-6 py-4 text-black rounded-md bg-white hover:bg-black hover:text-white'>SHOP NOW</button>
                    <button className='px-6 py-4 text-white  hover:bg-white rounded-md bg-gradient-to-r from-blue-500 to-blue-400  hover:text-black'>FIND MORE</button>
                </div>
            </div>

        </div>
    )
}

export default home