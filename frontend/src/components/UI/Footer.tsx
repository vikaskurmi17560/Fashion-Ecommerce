import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FitbitIcon from '@mui/icons-material/Fitbit';
import Link from 'next/link';
const icons=[
    {   id:"1",
        url:"https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/globe-free-img.png",
        name:"Worldwide Shipping",
        description:"It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.", 
    },
    {   id:"2",
        url:"https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/quality-free-img.png",
        name:"Best Quality",
        description:"It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        
    },
    {   id:"3",
        url:"https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/tag-free-img.png",
        name:"Best Offers",
        description:"It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.", 
    },
    {   id:"4",
        url:"https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/lock-free-img.png",
        name:"Secure Payments",
        description:"It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.", 
    },
]
function footer() {
  return (
    <div className='w-full flex flex-col border-t-2 border-slate-300 '>
        <div className="w-[90%] flex flex-row gap-10 items-center justify-center p-16 ml-20">
                {icons.map((icon) => (
                    <div key={icon.id} className='flex flex-col justify-center items-center gap-2 ml-16' >
                        <img
                            src={icon.url}
                            alt={icon.name}
                            className='m-2 text-sm'
                        />
                        <div className="flex flex-col justify-center items-center gap-2">
                            <h2 className="text-black text-2xl font-semibold">{icon.name}</h2>
                            <h3 className="text-black text-sm text-center">{icon.description}</h3>
                        </div>
                    </div>
                ))}
            </div>

        <h1 className='text-2xl text-black font-semibold py-16 px-36'>SALE UP TO 70% OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS.</h1>
        <hr />
        <div className="flex flex-row gap-10">
            <div className='flex flex-col'>
                <h1 className='px-36  py-12 text-black '>
                    <Link href={"/"} className='text-3xl font-bold'><FitbitIcon/> LOGO </Link>
                </h1>
                <p className=' px-36 font-extrabold text-2xl pb-40'>The best look anytime, anywhere.</p>
            </div>
            <div className='flex flex-col p-4'>
                <h1 className='text-black py-8  text-2xl pb-3'>For Her</h1>
                <ul className='text-gray-500 flex flex-col gap-2'>
                    <li>Women Jeans</li>
                    <li>Top and Shirts </li>
                    <li>Women Jackets</li>
                    <li>Heels and Flats </li>
                    <li>Women Accessories</li>
                </ul>
            </div>
            <div className='flex flex-col p-4'>
                <h1 className='text-black py-8  text-2xl pb-3'>For Him</h1>
                <ul className='text-gray-500 flex flex-col gap-2'>
                    <li>Men Jeans</li>
                    <li>Men Shirts</li>
                    <li>Men Jackets</li>
                    <li>Men Shoes</li>
                    <li>Men Accessories</li>
                </ul>
            </div>
            <div >
                <form action="" className='w-[80%] flex flex-col p-4 gap-4'>
                <h1 className='text black py-8  text-2xl pb-3'>Subscribe</h1>
                <input type="text" required className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-blue-200 focus:ring-2' placeholder='your email address' />
                <button className='w-full font-bold px-4 mt-4 py-3 text-white bg-gradient-to-r from-blue-500  via-blue-300 to-blue-500 hover:bg-gradient-to-r hover:from-blue-700  hover:via-blue-600 hover:to-blue-700'>SUBSCRIBE</button>
                </form>
            </div>
        </div>
        <hr />
        <div className='flex flex-row justify-between'>
        <p className='text-sm text-gray-500 py-16 px-16'>Copyright © 2024 Brandstore. Powered by Brandstore.</p>
        <div className=' flex flex-row py-16 px-12 gap-3'>
        <Link href={"https://www.facebook.com/?_rdr"} className='hover:text-blue-500 focus:text-red-600' > <FacebookIcon /> </Link>
        <Link href={"https://www.instagram.com/"} className='hover:text-blue-500 focus:text-red-600' > <InstagramIcon /> </Link>
        <Link href={"https://www.youtube.com/"} className='hover:text-blue-500 focus:text-red-600' > <YouTubeIcon />  </Link>
        <Link href={"https://www.google.co.in/"} className='hover:text-blue-500 focus:text-red-600' >  <GoogleIcon />  </Link>
        <Link href={"https://x.com/?lang=en"} className='hover:text-blue-500 focus:text-red-600' > <TwitterIcon />  </Link>
        <Link href={"/"} className='hover:text-blue-500'><FitbitIcon/></Link>
        </div>
        </div>
    </div>
  )
}

export default footer