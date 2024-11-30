'use client'
import Navbar from '@/components/UI/Navbar'
import Footer from '@/components/UI/Footer'
import CancelIcon from '@mui/icons-material/Cancel';
import useCart from '@/hook/useCart'
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';



function page() {
    const { carts, deleteCart } = useCart();
    const Router=useRouter();
    async function handleCheckout(amount: number) {

        const customer=localStorage.getItem("user_id");
        const body = {
            amount: amount
        }
        const response = await axios.post(`http://localhost:6969/api/v1/payment/create-order`, body)
        if (response.data.success) {
            const options = {
                "key": "rzp_test_3psAXU5WmuQ7qY", // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Vikas Corp", //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": response.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3389cc"
                },
                handler:async function(response:any){
                    response.customer=customer 
                    const res=await axios.post(`http://localhost:6969/api/v1/payment/verify-payment`,response);
                    if(res.data.success){
                        toast.success("payment successful")
                        Router.replace(`/success?razorpay_payment_id=${res.data.data}`);
                    }
                }
            };

            const rzpay = new (window as any).Razorpay(options);
            rzpay.open()


        }
    }
    return (
        <main className='flex flex-col justify-center items-center bg-slate-100'>
            <Navbar />
            <section className=' flex flex-col items-center h-auto w-screen bg-slate-100 gap-4'>
                <article className='h-auto w-[100%] flex flex-col items-center p-5'>
                    <div className="w-[80%] p-3 flex flex-col items-center">
                        <div className="w-[100%] py-10 text-center text-8xl text-slate-600 font-extrabold">Cart</div>
                    </div>
                </article>
                <article className="h-auto w-[80%]  flex flex-col items-center border-2 border-slate-300">

                    <div className="w-full h-auto p-2 grid grid-cols-6 gap-0 justify-center items-center bg-white rounded-md border-b-2 border-slate-300">
                        <div className="text-xl text-slate-700 font-extrabold text-center p-4">Remove Product</div>
                        <div className="text-xl text-slate-700 font-extrabold text-center p-4">Product Image</div>
                        <div className="text-xl text-slate-700 font-extrabold text-center p-4">Product Name</div>
                        <div className="text-xl text-slate-700 font-extrabold text-center p-4">Price</div>
                        <div className="text-xl text-slate-700 font-extrabold text-center p-4">Quantity</div>
                        <div className="text-xl text-slate-700 font-extrabold text-center p-4">Sub Total</div>
                    </div>


                    {carts &&
                        carts.map((cart: any) => {
                            return (
                                <div
                                    key={cart._id}
                                    className="h-auto w-full grid grid-cols-6 gap-0 justify-center items-center bg-slate-100 border-b-2 border-slate-300"
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

                    <button onClick={() => handleCheckout(1500)} className='text-white bg-blue-500 hover:bg-black hover:text-white w-full h-auto py-3 text-center text-2xl font-bold ' >
                        Checkout
                    </button>


                </div>
            </div>
            <Footer />
        </main>
    )
}

export default page