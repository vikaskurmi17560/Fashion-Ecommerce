'use client'
import Navbar from '@/components/UI/Navbar'
import React, { useEffect, useState } from 'react'
import Footer from '@/components/UI/Footer'
import StarIcon from '@mui/icons-material/Star';
import useProduct from '@/hook/useProduct';
import { useSearchParams } from 'next/navigation';
import { GetProduct } from '@/networks/productnetworks';
import Link from 'next/link';
function page() {
    const {  AddCart } = useProduct();
    const [item, setItem] = useState<any>(null);
    const [option, setOption] = useState<number>(0)
    const params = useSearchParams();
    const id = params.get("product_id");

    async function handleItem() {
       
        const data = await GetProduct(id);
        
        if (data.success) {
            setItem(data.data);
        }
    }
    useEffect(()=>{
         handleItem();
    },[])
  
    return (
        <main className='w-screen h-auto flex flex-col items-center bg-slate-100'>
            <div className='w-full h-32 bg-white bg-transparent '>
                <Navbar />
            </div>

            {
                item && (
                    <section className='w-[85%] h-auto flex flex-col  bg-slate-100 my-28 '>

                        <div className="w-full h-auto flex flex-row gap-10 p-20 ">
                            <img src={item.cover_image} alt="img" className='w-[50%] h-fit  shadow-xl shadow-gray-100 rounded-md' />
                            <div className="w-[50%] h-auto p-4 flex flex-col gap-6 font-semibold">
                                <div className="w-100%[] text-xl text-slate-500 flex flex-row">
                                    <Link href={"/"}>Home</Link> / <Link href={"#"}>{item.category}</Link> / <div>{item.name}</div></div>
                                <div className="text-black text-xl"> {item.category}</div>
                                <div className="text-black text-3xl font-extrabold">{item.name}</div>
                                <div className="text-slate-600 text-2xl">$ {item.original_price} – $ {item.sale_price}</div>
                                <div className="text-xl text-slate-500">{item.brief_description}</div>
                                <div className="text-black"> {item.colors} </div>
                                <div className="flex flex-row  justify-center">
                                    <button onClick={()=>AddCart(item)} className="bg-blue-500 text-2xl font-extrabold text-white hover:bg-black py-2 text-center rounded-md w-[50%]" >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-5 p-5 border-t-2 border-slate-300">
                            <div className={`${(option === 0) ? "border-black " : "border-none"} border-t-2 text-black text-2xl cursor-pointer p-3 rounded-sm`} onClick={() => setOption(0)}>Description</div>
                            <div className={`${(option === 1) ? "border-black " : "border-none"} border-t-2 text-black text-2xl cursor-pointer p-3 rounded-sm`} onClick={() => setOption(1)}>Additional Information</div>
                            <div className={`${(option === 2) ? "border-black " : "border-none"} border-t-2 text-black text-2xl cursor-pointer p-3 rounded-sm`} onClick={() => setOption(2)}>Reviews(0)</div>
                        </div>

                        {
                            option === 0 &&
                            <section className='w-full h-auto p-4 gap-4'>
                                <h1 className='text-3xl font-bold text-black'>Production Description</h1>
                                <p className='text-slate-500 text-xl text-wrap'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, natus! Architecto a, vitae quo totam adipisci tempora libero earum dolores maiores unde corporis delectus labore nisi quasi animi nemo quibusdam quisquam optio ipsam ab deleniti magnam error. Atque tenetur quod, voluptatibus aliquid distinctio quasi reiciendis reprehenderit molestias magni deserunt sunt. Voluptate quod dicta accusamus modi minus possimus iure obcaecati tempora ex cupiditate deleniti nam dolorum fugit debitis repudiandae veniam totam, maiores esse, quos earum, exercitationem commodi. Voluptates sequi, et autem quaerat fuga adipisci magni mollitia optio dignissimos asperiores dolorem tenetur labore! Minima, explicabo! Non aliquid harum reiciendis in beatae repudiandae.</p>

                                <div className=" w-[100%] h-auto flex flex-col items-center justify-center p-4">
                                    <div className="w-[98%] h-auto grid grid-cols-2 gap-4">
                                        <img src="	https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-about-01.jpg" alt="img" className="w-[98%]" />

                                        <img src="	https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-about-04.jpg" alt="img" className="w-[98%]" />
                                        <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-about-02.jpg" alt="img" className="w-[98%]" />

                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <h1 className='font-bold text-2xl'>heading</h1>
                                                <p className="text-xl text-slate-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem quod reiciendis deserunt perferendis quidem laudantium veniam consequatur accusantium adipisci quisquam.</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h1 className="font-bold text-2xl">heading</h1>
                                                <p className="text-xl text-slate-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem quod reiciendis deserunt perferendis quidem laudantium veniam consequatur accusantium adipisci quisquam.</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h1 className="font-bold text-2xl">heading</h1>
                                                <p className="text-xl text-slate-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem quod reiciendis deserunt perferendis quidem laudantium veniam consequatur accusantium adipisci quisquam.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col p-4 ">
                                            <div className="flex flex-col gap-2">
                                                <h1 className='font-bold text-2xl'>heading</h1>
                                                <p className="text-xl text-slate-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem quod reiciendis deserunt perferendis quidem laudantium veniam consequatur accusantium adipisci quisquam.</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h1 className="font-bold text-2xl">heading</h1>
                                                <p className="text-xl text-slate-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem quod reiciendis deserunt perferendis quidem laudantium veniam consequatur accusantium adipisci quisquam.</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h1 className="font-bold text-2xl">heading</h1>
                                                <p className="text-xl text-slate-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem quod reiciendis deserunt perferendis quidem laudantium veniam consequatur accusantium adipisci quisquam.</p>
                                            </div>
                                        </div>
                                        <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-about-03.jpg" alt="img" className="w-[98%]" />

                                    </div>

                                </div>
                            </section>
                        }

                        {
                            option === 1 && <div className=" flex flex-row  w-full h-auto p-4">
                                <div className="text-black text-xl  px-10  py-2 ">Color</div>
                                <div className="text-xl text-slate-500 px-10 py-2">{item.colors}</div>
                            </div>

                        }
                        {
                            option === 2 && <div className="flex flex-col ">
                                <div className="text-2xl text-slate-700 py-8">There are no reviews yet.</div>
                                <div className="border-2 boredr-slate-300 gap-3 p-6" >
                                    <div className="text-3xl text-black px-6 py-2">
                                        Be the first to review “Anchor Bracelet”
                                    </div>
                                    <div className="text-xl text-black px-6 py-2">
                                        Your email address will not be published. Required fields are marked *

                                    </div>
                                    <div className="text-2xl text-black px-6 py-1">
                                        Your rating *  <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                                    </div>
                                    <form className=" flex flex-col p-4 gap-10">

                                        <label className='text-2xl h-auto w-full   text-black p-2'> <div className="py-2">Your Review *</div>
                                            <textarea rows={10} className=" h-auto w-full px-8 py-4 border-2" required></textarea>
                                        </label>

                                        <div className="grid grid-cols-2 gap-4">
                                            <label className='w-full h-auto   flex flex-col gap-2 text-2xl  text-black '>Name*
                                                <input type="text" className="px-8 py-4 border-2" required />
                                            </label>
                                            <label className='w-full h-auto  flex flex-col gap-2  text-2xl  text-black '>Email*
                                                <input type="email" className="px-8 py-4 border-2" required />
                                            </label>
                                        </div>
                                        <button type="submit" className="w-fit h-auto rounded-md bg-blue-500 py-2 px-10 text-2xl font-bold text-white hover:bg-black">Submit</button>
                                    </form>
                                </div>
                            </div>
                        }



                    </section>
                )
            }
            <Footer />
        </main>
    )
}

export default page