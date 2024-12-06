'use client'
import Navbar from '@/components/UI/Navbar'
import Footer from '@/components/UI/Footer'
import CancelIcon from '@mui/icons-material/Cancel';
import useCart from '@/hook/useCart'
import { useRouter } from 'next/navigation';




function page() {
    const { carts, deleteCart } = useCart();
    const Router=useRouter();

   
    return (
        <main className='flex flex-col justify-center items-center bg-slate-100'>
            <Navbar />
            <section className=' flex flex-col items-center h-auto w-screen bg-slate-100 gap-4'>
                <article className='h-auto w-[100%] flex flex-col items-center lg:p-5 md:p-3 p-1'>
                    <div className="w-[80%] lg:p-3 md:p-3 p-1 flex flex-col items-center">
                        <div className="w-[100%] lg:py-10 md:py-6 py-3 text-center lg:text-8xl md:text-5xl text-2xl text-slate-600 font-extrabold">Cart</div>
                    </div>
                </article>
                <article className="h-auto w-[80%]  flex flex-col items-center border-2 border-slate-300">

                    <div className="w-full h-auto p-2 grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1  gap-0 justify-center lg:text-xl md:text-sm text-[15px] text-slate-700 items-center bg-white rounded-md border-b-2 border-slate-300">
                        <div className="font-extrabold text-center lg:p-4 md:p-2 p-1">Remove Product</div>
                        <div className="font-extrabold text-center lg:p-4 md:p-2 p-1">Product Image</div>
                        <div className="font-extrabold text-center lg:p-4 md:p-2 p-1">Product Name</div>
                        <div className="font-extrabold text-center lg:p-4 md:p-2 p-1">Price</div>
                        <div className="font-extrabold text-center lg:p-4 md:p-2 p-1">Quantity</div>
                        <div className="font-extrabold text-center lg:p-4 md:p-2 p-1">Sub Total</div>
                    </div>

                     
                    {carts &&
                        carts.map((cart: any) => {
                            return (
                                <div
                                    key={cart._id}
                                    className="h-auto w-full grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1  gap-0 justify-center items-center bg-slate-100 border-b-2 border-slate-300"
                                >
                                    <div
                                        className="text-xl cursor-pointer w-auto text-center"
                                        onClick={() => deleteCart(cart._id)}
                                    >
                                        <CancelIcon />
                                    </div>

                                    <img
                                        src={cart.product_id.cover_image}
                                        alt="img"
                                        className="w-24 h-24 mx-auto"
                                    />
                                    <div className="text-black text-xl w-auto text-center">{cart.product_id.name}</div>
                                    <div className="text-slate-600 text-xl w-auto text-center">
                                        $ {cart.total_price}
                                    </div>
                                    <div className="text-slate-600 text-xl w-auto text-center">
                                        {cart.quantity}
                                    </div>
                                    <div className="text-slate-600 text-xl w-auto text-center">
                                        $ {cart.total_price * cart.quantity}
                                    </div>
                                </div>
                            );
                        })}

                </article>

            </section>
            <div className="relative w-[81%] h-[40vh]">
                <div className=" absolute right-0 top-0 w-[50%] h-auto  border-2 border-slate-300 flex flex-col items-center gap-4">
                    <div className=" w-full text-2xl text-slate-700 font-bold pl-2 py-1 border-b-2 border-b-slate-300 bg-white">Cart Total</div>
                    <div className="grid grid-cols-2 p-4 w-[95%] h-auto border-slate-300">
                        <div className=" text-xl text-black p-4 border-2 border-slate-300">Subtotal</div>
                        <div className=" text-xl text-slate-500 p-4 border-2 border-slate-300">$ 150</div>
                        <div className=" text-xl text-black p-4 border-2 border-slate-300">total</div>
                        <div className=" text-xl text-slate-500 p-4 border-2 border-slate-300">$ 150</div>
                    </div>

                    <button onClick={()=>Router.push("/checkout")}  className='text-white bg-blue-500 hover:bg-black hover:text-white w-full h-auto py-3 text-center text-2xl font-bold ' >
                        Checkout
                    </button>


                </div>
            </div>
            <Footer />
        </main>
    )
}

export default page