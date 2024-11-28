import React from 'react'
import Navbar from '../UI/Navbar'

function home() {
    return (

        <div className="  z-10 flex bg-fixed h-screen flex-col   bg-[url('https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/home-new-bg-free-img.jpg')] items-center bg-cover bg-no-repeat bg-center before:content-[''] before:absolute before:inset-0  before:block before:bg-gradient-to-tl before:from-black/50  before:to-sky-600 before:opacity-75  before:z-[-5] ">
            <Navbar />
            <div className=" flex pt-40 flex-col  pl-14 w-[200vh] gap-5 pb-16">
                <div className=' w-[90vh] mt-40 flex flex-col  flex-wrap gap-8 '>
                    <h1 className='text-White font-semibold text-6xl  text-white'>Raining Offers For</h1>
                    <h1 className='text-White font-semibold text-6xl  text-white'>Hot Summer!</h1>
                </div>
                <div className=' w-[50vh] h-20 items-center'>
                    <h1 className='text-white text-2xl font-semibold '>25% off on all Products</h1>
                </div>
                <div className='flex flex-row gap-4'>
                    <button className='px-6 py-4 text-black text-1xl font-semibold rounded-md bg-white hover:bg-black hover:text-white'>SHOP NOW</button>
                    <button className='px-6 py-4 text-white text-1xl font-semibold hover:bg-white rounded-md bg-gradient-to-r from-blue-500 to-blue-400  hover:text-black'>FIND MORE</button>
                </div>
            </div>

        </div>
    )
}

export default home