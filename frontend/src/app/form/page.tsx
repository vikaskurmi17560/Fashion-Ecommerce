'use client';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddAddress } from '@/networks/addressnetworks';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Countries = [
  "China", "India", "United States", "Indonesia", "Pakistan", "Nigeria",
  "Brazil", "Bangladesh", "Russia", "Mexico", "Japan", "Ethiopia",
  "Philippines", "Egypt", "Vietnam", "DR Congo", "Turkey", "Iran",
  "Germany", "Thailand",
];

const States = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

interface AddressForm {
  firstname: string;
  lastname: string;
  country: string;
  state: string;
  street: string;
  city: string;
  pincode: string;
  phone_no: string;
  email: string;
}

function Form() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<AddressForm>({
    defaultValues: {
      firstname: '',
      lastname: '',
      country: '',
      state: '',
      street: '',
      city: '',
      pincode: '',
      phone_no: '',
      email: '',
    },
  });

  useEffect(() => {
    const id = localStorage.getItem('eco_user_id');
    if (id) setCustomerId(id);
  }, []);

  const formHandle: SubmitHandler<AddressForm> = async (data) => {
    if (!customerId) {
      toast.error('User ID not found.');
      return;
    }

    try {
      const formData = { ...data, customer_id: customerId };
      const response = await AddAddress(formData);

      if (response.success) {
        toast.success('Address added successfully');
        router.replace('/checkout');
      } else {
        toast.error(response.message || 'Failed to add address');
      }
    } catch (error: any) {
      console.error('AddAddress Error:', error);
      toast.error('Address already exists or fields are missing');
    }
  };

  return (
    <main className="min-h-screen w-full bg-white text-gray-900 flex flex-col">
      <Navbar />

      <section className="w-full flex justify-center px-4 py-10 bg-gray-50">
        <form
          onSubmit={handleSubmit(formHandle)}
          className="w-full max-w-4xl bg-white border border-gray-200 shadow-lg rounded-xl p-8 space-y-8"
        >
          <h1 className="text-3xl font-bold text-center text-blue-700">
            Address Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="md:col-span-1">
              <label htmlFor="firstname" className="mb-1 font-medium flex flex-row">
                First Name <p className="text-red-500 ml-1">*</p>
              </label>
              <input
                id="firstname"
                type="text"
                required
                {...register('firstname')}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>


            <div className="md:col-span-1">
              <label htmlFor="lastname" className="mb-1 font-medium flex flex-row">
                Last Name <p className="text-red-500 ml-1">*</p>
              </label>
              <input
                id="lastname"
                type="text"
                required
                {...register('lastname')}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>


            <div className="md:col-span-2">
              <label htmlFor="street" className="mb-1 font-medium flex flex-row">
                Street Address <p className="text-red-500 ml-1">*</p>
              </label>
              <input
                id="street"
                type="text"
                required
                {...register('street')}
                placeholder="House number and street name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="city" className="mb-1 font-medium flex flex-row">
                Town / City <p className="text-red-500 ml-1">*</p>
              </label>
              <input
                id="city"
                type="text"
                required
                {...register('city')}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>


            <div className="md:col-span-1">
              <label htmlFor="pincode" className="mb-1 font-medium flex flex-row">
                Pin Code <p className="text-red-500 ml-1">*</p>
              </label>
              <input
                id="pincode"
                type="text"
                required
                {...register('pincode')}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="country" className="mb-1 font-medium flex flex-row">
                Country / Region <p className="text-red-500 ml-1">*</p>
              </label>
              <select
                id="country"
                {...register('country')}
                required
                defaultValue=""
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>Select your country...</option>
                {Countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="state" className="mb-1 font-medium flex flex-row">
                State <p className="text-red-500 ml-1">*</p>
              </label>
              <select
                id="state"
                {...register('state')}
                required
                defaultValue=""
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>Select your state...</option>
                {States.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="phone_no" className=" mb-1 font-medium flex flex-row">
                Phone <p className="text-red-500 ml-1">*</p>
              </label>
              <input
                id="phone_no"
                type="tel"
                required
                {...register('phone_no')}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>


            <div className="md:col-span-1">
              <label htmlFor="email" className=" mb-1 font-medium flex flex-row">
                Email Address <p className="text-red-500 ml-1">*</p>
              </label>
              <input
                id="email"
                type="email"
                required
                {...register('email')}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>


          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Add Address
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
            >
              Back
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}

export default Form;
