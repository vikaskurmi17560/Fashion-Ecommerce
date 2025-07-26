'use client'
import Navbar from '@/components/UI/Navbar'
import React, { useEffect, useState } from 'react'
import Footer from '@/components/UI/Footer'
import StarIcon from '@mui/icons-material/Star';
import { useSearchParams } from 'next/navigation';
import { GetProduct } from '@/networks/productnetworks';
import Link from 'next/link';
import useCart from '@/hook/useCart';

function Page() {
    const { AddCart } = useCart();
    const [item, setItem] = useState<any>(null);
    const [option, setOption] = useState<number>(0);
    const params = useSearchParams();
    const id = params.get("product_id");

    async function handleItem() {
        const data = await GetProduct(id);
        if (data.success) {
            setItem(data.data);
        }
    }

    useEffect(() => {
        handleItem();
    }, []);

    return (
        <main className='w-full min-h-screen flex flex-col items-center bg-slate-100'>
            <div className='w-full bg-transparent'>
                <Navbar />
            </div>

            {item && (
                <section className='w-[95%] max-w-7xl mx-auto flex flex-col bg-slate-100 my-10 px-4'>
                   
                    <div className="w-full flex flex-col lg:flex-row gap-10 py-10">
                        <img src={item.cover_image} alt="img"
                            className='w-full lg:w-1/2 h-auto shadow-xl shadow-gray-100 rounded-md object-cover' />
                        <div className="w-full lg:w-1/2 flex flex-col gap-4 font-semibold">
                            <div className="text-sm md:text-base text-slate-500 flex flex-wrap gap-2">
                                <Link href="/">Home</Link> / <Link href="#">{item.category}</Link> / <span>{item.name}</span>
                            </div>
                            <div className="text-black text-lg">{item.category}</div>
                            <div className="text-black text-2xl font-extrabold">{item.name}</div>
                            <div className="text-slate-600 text-xl">₹{item.original_price} – ₹{item.sale_price}</div>
                            <div className="text-base text-slate-500">{item.brief_description}</div>
                            <div className="text-black text-sm md:text-base">{item.colors}</div>
                            <button onClick={() => AddCart(item)} className="bg-blue-500 text-lg font-bold text-white hover:bg-black py-2 rounded-md w-full md:w-1/2 mt-4">
                                Add To Cart
                            </button>
                        </div>
                    </div>

                    
                    <div className="flex flex-wrap gap-3 p-4 border-t-2 border-slate-300">
                        {['Description', 'Additional Information', 'Reviews(0)'].map((tab, i) => (
                            <div key={i}
                                className={`${(option === i) ? "border-black" : ""} border-t-2 text-black text-lg md:text-2xl cursor-pointer p-2`}
                                onClick={() => setOption(i)}>{tab}</div>
                        ))}
                    </div>

                   
                    {option === 0 && (
                        <section className='w-full p-4'>
                            <h1 className='text-2xl md:text-3xl font-bold text-black mb-4'>Product Description</h1>
                            <p className='text-slate-500 text-base md:text-xl'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. ...
                            </p>

                           
                            <div className="w-full flex flex-col items-center justify-center mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-about-01.jpg" alt="img" className="w-full" />
                                    <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-about-04.jpg" alt="img" className="w-full" />
                                    <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-about-02.jpg" alt="img" className="w-full" />

                                  
                                    <div className="flex flex-col gap-4 p-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex flex-col gap-1">
                                                <h2 className='font-bold text-lg md:text-2xl'>Heading</h2>
                                                <p className="text-base md:text-xl text-slate-500">Lorem ipsum dolor sit amet...</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-4 p-2">
                                        {[4, 5, 6].map(i => (
                                            <div key={i} className="flex flex-col gap-1">
                                                <h2 className='font-bold text-lg md:text-2xl'>Heading</h2>
                                                <p className="text-base md:text-xl text-slate-500">Lorem ipsum dolor sit amet...</p>
                                            </div>
                                        ))}
                                    </div>

                                    <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-about-03.jpg" alt="img" className="w-full" />
                                </div>
                            </div>
                        </section>
                    )}

                    {option === 1 && (
                        <div className="flex flex-col md:flex-row p-4">
                            <div className="text-black text-lg md:text-xl px-4 py-2">Color</div>
                            <div className="text-slate-500 text-lg md:text-xl px-4 py-2">{item.colors}</div>
                        </div>
                    )}

                    {option === 2 && (
                        <div className="flex flex-col p-4 gap-6">
                            <div className="text-xl md:text-2xl text-slate-700">There are no reviews yet.</div>
                            <div className="border-2 border-slate-300 p-6">
                                <h2 className="text-xl md:text-3xl font-bold text-black mb-2">
                                    Be the first to review “{item.name}”
                                </h2>
                                <p className="text-base md:text-xl text-black mb-2">
                                    Your email address will not be published. Required fields are marked *
                                </p>
                                <div className="text-lg md:text-2xl text-black mb-4">
                                    Your rating * <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                                </div>

                                <form className="flex flex-col gap-6">
                                    <label className='flex flex-col gap-2 text-lg md:text-2xl text-black'>
                                        <span>Your Review *</span>
                                        <textarea rows={5} className="border-2 p-4 w-full" required></textarea>
                                    </label>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className='flex flex-col gap-2 text-lg md:text-2xl text-black'>
                                            Name*
                                            <input type="text" className="border-2 p-4" required />
                                        </label>
                                        <label className='flex flex-col gap-2 text-lg md:text-2xl text-black'>
                                            Email*
                                            <input type="email" className="border-2 p-4" required />
                                        </label>
                                    </div>
                                    <button type="submit" className="w-fit bg-blue-500 hover:bg-black text-white text-lg md:text-2xl font-bold py-2 px-6 rounded-md">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </section>
            )}

            <Footer />
        </main>
    );
}

export default Page;
