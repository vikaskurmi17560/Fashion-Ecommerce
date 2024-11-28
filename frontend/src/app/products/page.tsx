import Navbar from '@/components/UI/Navbar'
import React from 'react'
import Filters from '@/components/productpage/filters'
import AllProducts from '@/components/productpage/allProducts'
import Footer from '@/components/UI/Footer'
function page() {
  return (
    <main className=''>
        <Navbar />
        <div className="py-16 bg-slate-100 w-full flex flex-row ">
            <Filters />
            <AllProducts />
        </div>
        <Footer />
    </main>
  )
}

export default page