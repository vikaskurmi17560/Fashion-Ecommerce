import React from 'react';
import Navbar from '../UI/Navbar';

function Home() {
  return (
    <div
      className="w-full z-10 flex bg-fixed h-screen flex-col items-center bg-cover bg-no-repeat bg-center relative before:absolute before:inset-0 before:block before:bg-gradient-to-tl before:from-black/50 before:to-sky-600 before:opacity-75 before:z-[-5]"
      style={{
        backgroundImage:
          "url('https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/home-new-bg-free-img.jpg')",
      }}
    >
      <Navbar />
      <div className="flex flex-col px-6 md:px-16 w-full max-w-screen-xl gap-6 py-12 md:py-20 z-10">
        <div className="w-full md:w-[60%] py-6 md:py-16 flex flex-col text-white text-3xl md:text-6xl font-semibold gap-4 md:gap-6">
          <h1>Raining Offers For</h1>
          <h1>Hot Summer!</h1>
        </div>

        <div className="w-full md:w-[60%] h-auto text-white text-xl md:text-2xl font-semibold">
          <h1>25% off on all Products</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-lg md:text-xl font-semibold">
          <button className="px-6 py-3 md:py-4 text-black rounded-md bg-white hover:bg-black hover:text-white transition">
            SHOP NOW
          </button>
          <button className="px-6 py-3 md:py-4 text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-400 hover:bg-white hover:text-black transition">
            FIND MORE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
