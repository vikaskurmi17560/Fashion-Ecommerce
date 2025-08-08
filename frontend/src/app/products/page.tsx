'use client'
import Navbar from '@/components/UI/Navbar'
import React from 'react'
import Filters from '@/components/productpage/filters'
import AllProducts from '@/components/productpage/allProducts'
import Footer from '@/components/UI/Footer'

function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col lg:flex-row bg-slate-100 py-6 px-4 gap-6">

        <div className="lg:w-1/4 w-full">
          <Filters />
        </div>
        <div className="lg:flex-1 w-full">
          <AllProducts />
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Page;
