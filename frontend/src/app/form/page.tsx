'use client'
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import { useForm } from 'react-hook-form';
import { AddAddress } from '@/networks/addressnetworks';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const Countries = [
    "China",
    "India",
    "United States",
    "Indonesia",
    "Pakistan",
    "Nigeria",
    "Brazil",
    "Bangladesh",
    "Russia",
    "Mexico",
    "Japan",
    "Ethiopia",
    "Philippines",
    "Egypt",
    "Vietnam",
    "DR Congo",
    "Turkey",
    "Iran",
    "Germany",
    "Thailand",
];
const States = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
];
function form() {
    const router=useRouter();
    const { register, handleSubmit } = useForm();
    const id=localStorage.getItem("user_id");
    const formHandle = async (data: any) => {
        try {
            const formData = {
                ...data
            }
            formData.customer_id = id;
            const response = await AddAddress(formData);
            if (response.data.success) {
                router.replace("/checkout");
                toast.success("Address Add Successfully");
            }
        }
        catch (error: any) {

            toast.error("Address already here or file the field")
        }
    }


    return (
        <main className='w-screen h-auto flex flex-col bg-white' >
            <Navbar />
            <section className='w-full h-auto flex flex-col items-center justify-center bg-gray-100 rounded-sm p-2'>
                <form onSubmit={handleSubmit(formHandle)} className="w-[80%] lg:text-xl md:text-sm text-[10px] flex flex-col h-auto xl:py-6 md:py-3  py-1 px-2 border-2 gap-2 bg-slate-100 border-blue-100">
                    <h1 className="text-black lg:text-3xl md:text-xl text-[15px] font-extrabold">
                        Billing details
                    </h1>
                    <div className="flex lg:flex-row flex-col py-4 lg:px-2 px-1 lg:gap-4 md:gap-2 gap-1">
                        <div className="w-full gap-4 flex flex-col">
                            <label className='text-slate-600 flex flex-row gap-1'>
                                <h1 className="text-black">
                                    First Name
                                </h1>
                                <p className="text-red-500">
                                    *
                                </p>
                            </label>
                            <input type="text"  {...register("firstname")} className='w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md' />
                        </div>
                        <div className="w-full lg:gap-4 gap-2  flex flex-col">
                            <label className='text-slate-600  flex flex-row  gap-1 '>
                                <h1 className="text-black">
                                    Last Name
                                </h1>
                                <p className="text-red-500">
                                    *
                                </p>
                            </label>
                            <input type="text"  {...register("lastname")} className='w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md' />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 p-2">
                        <label className="text-slate-600 ">
                            <h1 className="text-black">
                                Country / Region
                            </h1>
                        </label>
                        <select  {...register("country")} name="country" id="country" className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md">
                            <option value="" disabled selected >
                                Select your country....
                            </option>
                            {Countries.map((country, index) => (
                                <option key={index} value={country} >
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>



                    <div className="flex flex-col gap-2 p-2">
                        <label className="text-slate-600  flex flex-row gap-1 ">
                            <h1 className="text-black">
                                Street address
                            </h1>
                            <p className="text-red-500">
                                *
                            </p>
                        </label>
                        <input type="text" {...register("street")} placeholder='House number and street name' className=" w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
                       
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <label className="text-slate-600 flex flex-row gap-1 ">
                            <h1 className="text-black">
                                Town/City
                            </h1>
                            <p className="text-red-500">
                                *
                            </p>
                        </label>
                        <input type="text"  {...register("city")} className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <label className="text-slate-600 flex flex-row gap-1 ">
                            <h1 className="text-black">
                                State
                            </h1>
                            <p className="text-red-500">
                                *
                            </p>
                        </label>
                        <select  {...register("state")} name="state" id="state" className=" w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md">
                            <option value="" disabled selected >
                                Select your state....
                            </option>
                            {

                                States.map((state, index) => {
                                    return (
                                        <option value={state} key={index}>
                                            {state}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <label className="text-slate-600 flex flex-row gap-1 ">
                            <h1 className="text-black">
                                Pin Code
                            </h1>
                            <p className="text-red-500">
                                *</p>
                        </label>
                        <input type="text"  {...register("pincode")} className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <label className="text-slate-600  flex flex-row gap-1 ">
                            <h1 className="text-black">
                                Phone
                            </h1>
                            <p className="text-red-500">
                                *
                            </p>
                        </label>
                        <input type="phone"  {...register("phone_no")} className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <label className="text-slate-600  flex flex-row gap-1 ">
                            <h1 className="text-black">
                                Email Address
                            </h1>
                            <p className="text-red-500">
                                *
                            </p>
                        </label>
                        <input type="email"  {...register("email")} className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" />
                    </div>
                    <div className="flex flex-col gap-8 px-2">
                        <h1 className="text-black lg:text-3xl md:text-xl text-[15px] font-extrabold">Additional information</h1>
                        <div className="lg:text-xl md:text-sm text-[10px] text-slate-500 flex flex-col gap-2">
                            <h1 className='text-black lg:text-xl md:text-sm text-[10px]'>Order notes (optional)</h1>
                            <textarea name="" id="" rows={4} className="w-full border lg:p-3 md:p-2 p-1 focus:border-dotted focus:border-slate-700 required  rounded-md" >
                                Order notes (optional)
                            </textarea>
                        </div>
                    </div>

                  
                   <button type='submit' className="self-center mt-2 w-fit px-1 h-fit text-white bg-blue-500 hover:bg-black rounded-md text-center font-bold lg:text-2xl md:text-xl text-[12px] py-1">Add  Address</button>
 
                </form>
                <button onClick={()=>router.back()} className="self-center mt-2 w-fit px-1 h-fit text-white bg-blue-500 hover:bg-black rounded-md text-center font-bold lg:text-2xl md:text-xl text-[12px] py-1">Back </button>
            </section>

            <Footer />
        </main>
    )
}

export default form
