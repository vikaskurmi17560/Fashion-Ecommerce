import React from 'react'

function filters() {
  return (
    <main className='flex flex-1 flex-col bg-slate-100 w-[50vh] h-screen m-4'>
      <div className="flex flex-row items-center gap-2">
        <input type="text" placeholder='Search Products' className='text-black border text-center text-2xl px-5 py-4' />
        <h1 className='text-white font-bold text-center text-7xl bg-blue-500 h-16 w-16'>&gt;</h1>
      </div>
      <div className="">
        <h1 className='text-black text-3xl my-8'>Filter by Price</h1>
        <input type="range" maxLength={100} minLength={20} className='w-[90%] text-black mx-4' />
        <div className="flex flex-row justify-between my-5">
          <button className='bg-blue-500 w-[30%] text-xl text-white'>Filter</button>
          <h1 className='text-black text-xl '>Price: $110 — $290</h1>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-12">
        <h1 className='w-full text-3xl text-black my-6'>Categories</h1>

        <div className='flex flex-row justify-between w-full text-xl'>Accessories <h2>(7)</h2></div>
        <div className='flex flex-row justify-between w-full text-xl'>Men <h2>(12)</h2></div>
        <div className='flex flex-row justify-between w-full text-xl'>Women <h2>(7)</h2></div>

      </div>
      <div className="">
        <h1 className='text-3xl w-full text-black'>Our Best Sellers</h1>

      </div>
    </main>
  )
}

export default filters