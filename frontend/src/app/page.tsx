import React from 'react'
import Home from '../components/homepage/home'
import HeroSection from '@/components/homepage/heroSection'
import FeatureSection from '@/components/homepage/featureSection'
import Footer from '@/components/UI/Footer'
function page() {
  
  return (
  
     <div className='flex flex-col gap-4'>
      <Home />
      <HeroSection />
      <FeatureSection />
      <Footer />
      </div>

  )
}

export default page;