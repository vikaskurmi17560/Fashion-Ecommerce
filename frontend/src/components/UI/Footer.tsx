import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FitbitIcon from '@mui/icons-material/Fitbit';
import Link from 'next/link';
const icons = [
  {
    id: "1",
    url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/globe-free-img.png",
    name: "Worldwide Shipping",
    description: "It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    id: "2",
    url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/quality-free-img.png",
    name: "Best Quality",
    description: "It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",

  },
  {
    id: "3",
    url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/tag-free-img.png",
    name: "Best Offers",
    description: "It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    id: "4",
    url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/lock-free-img.png",
    name: "Secure Payments",
    description: "It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
]
function Footer() {
  return (
    <div className="w-full flex flex-col lg:border-t-2 border-t-1 border-slate-300 bg-white px-2">
      {/* Icons Section */}
      <div className="w-full flex flex-wrap lg:gap-10 md:gap-5 gap-2 items-center justify-center lg:p-8 md:p-4 p-2">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col justify-center items-center gap-2"
          >
            <img
              src={icon.url}
              alt={icon.name}
              className="m-2 w-16 h-16" // Ensure a consistent size for icons
            />
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-black lg:text-xl md:text-sm text-[12px] font-semibold">{icon.name}</h2>
              <h3 className="text-black lg:text-sm md:text-xs text-[8px] text-center">
                {icon.description}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Sale Banner */}
      <h1 className="lg:text-xl md:text-sm text-[15px] text-black font-semibold lg:py-8 lg:px-4 md:py-4 md:px-2 px-1 py-2 text-center">
        SALE UP TO 70% OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS.
      </h1>

      <hr />

      {/* Footer Content */}
      <div className="w-full flex lg:flex-row flex-col md:flex-row justify-between lg:px-4 md:px-2 px-1 lg:py-8 lg:gap-8 md:py-4 md-gap-4 py-1 gap-2">
        {/* Logo Section */}
        <div className="flex flex-col flex-1">
          <h1 className="text-black lg:text-2xl md:text-xl text-sm font-bold">
            <Link href={"/"}>
              <FitbitIcon sx={{
                fontSize: { sm: '14px', md: '18px', lg: '24px' },
              }} /> LOGO
            </Link>
          </h1>
          <p className="font-extrabold lg:text-lg md:text-sm text-[15px] lg:pt-4 md:pt-2 pt-1">
            The best look anytime, anywhere.
          </p>
        </div>

        {/* For Her Section */}
        <div className="flex flex-col flex-1  lg:text-xl md:text-sm text-[10px] ">
          <h1 className="text-black text-[15px] font-semibold">For Her</h1>
          <ul className="text-gray-500 flex flex-col gap-2 pt-4">
            <li>Women Jeans</li>
            <li>Top and Shirts</li>
            <li>Women Jackets</li>
            <li>Heels and Flats</li>
            <li>Women Accessories</li>
          </ul>
        </div>

        {/* For Him Section */}
        <div className="flex flex-col flex-1 lg:text-xl md:text-sm text-[10px]">
          <h1 className="text-black text-[15px] font-semibold">For Him</h1>
          <ul className="text-gray-500 flex flex-col lg:gap-2 gap-1 lg:pt-4 pt-2">
            <li>Men Jeans</li>
            <li>Men Shirts</li>
            <li>Men Jackets</li>
            <li>Men Shoes</li>
            <li>Men Accessories</li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="flex flex-col flex-1">
          <h1 className="text-black lg:text-xl md:text-sm text-[15px] font-semibold">Subscribe</h1>
          <form className="flex flex-col lg:gap-4 gap-2  lg:pt-4 pt-2">
            <input
              type="email"
              required
              className="w-full lg:px-4 px-2 lg:py-2 py-1 lg:text-xl md:text-sm text-[12px] lg:border-2 border-1 rounded-md text-gray-500 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Your email address"
            />
            <button className="w-full lg:py-2 py-1 lg:text-xl md:text-sm text-[12px] text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      <hr />

      {/* Bottom Footer */}
      <div className="flex flex-wrap justify-between items-center lg:px-4 px-1 md:px-2 lg:py-8 md:py-4 py-2">
        <p className="text-gray-500 lg:text-sm text-[8px]">
          Copyright © 2024 Brandstore. Powered by Brandstore.
        </p>
        <div className="flex md:flex-row sm:flex-row gap-3 sm:justify-around md:justify-around ">
          <Link href="https://www.facebook.com/" className="hover:text-blue-500">
            <FacebookIcon sx={{
              fontSize: { sm: '14px', md: '18px', lg: '24px' },
            }} />
          </Link>
          <Link href="https://www.instagram.com/" className="hover:text-blue-500">
            <InstagramIcon sx={{
              fontSize: { sm: '14px', md: '18px', lg: '24px' },
            }} />
          </Link>
          <Link href="https://www.youtube.com/" className="hover:text-blue-500">
            <YouTubeIcon sx={{
              fontSize: { sm: '14px', md: '18px', lg: '24px' },
            }} />
          </Link>
          <Link href="https://www.google.co.in/" className="hover:text-blue-500">
            <GoogleIcon sx={{
              fontSize: { sm: '14px', md: '18px', lg: '24px' },
            }} />
          </Link>
          <Link href="https://x.com/" className="hover:text-blue-500">
            <TwitterIcon sx={{
              fontSize: { sm: '14px', md: '18px', lg: '24px' },
            }} />
          </Link>
          <Link href="/" className="hover:text-blue-500">
            <FitbitIcon sx={{
              fontSize: { sm: '14px', md: '18px', lg: '24px' },
            }} />
          </Link>
        </div>
      </div>
    </div>
  );
}


export default Footer