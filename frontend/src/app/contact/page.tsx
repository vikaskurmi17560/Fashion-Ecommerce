'use client';

import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import React from 'react';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import HearingIcon from '@mui/icons-material/Hearing';

const contactDetails = [
  {
    id: 1,
    department: 'Sales',
    description: 'Vestibulum ante ipsum primis in faucibus orci luctus.',
    contact: '1730 843 1245',
  },
  {
    id: 2,
    department: 'Complaints',
    description: 'Vestibulum ante ipsum primis in faucibus orci luctus.',
    contact: '1900 223 8899',
  },
  {
    id: 3,
    department: 'Returns',
    description: 'Vestibulum ante ipsum primis in faucibus orci luctus.',
    contact: 'return07@gmail.com',
  },
  {
    id: 4,
    department: 'Marketing',
    description: 'Vestibulum ante ipsum primis in faucibus orci luctus.',
    contact: '1290 444 5493',
  },
];

function Page() {
  return (
    <main className="w-full h-auto">
      
      <header className="flex flex-col items-center justify-center bg-[url('https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/banner-06.jpg')] bg-cover bg-center w-full h-[85vh]">
        <Navbar />
        <div className="w-[90%] flex items-center justify-center text-center h-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
            CONTACT US
          </h1>
        </div>
      </header>

      
      <section className="flex flex-col items-center w-full bg-slate-100 py-12">
        
        <div className="text-center px-4">
          <h2 className="text-lg sm:text-xl font-bold text-black">Have any queries?</h2>
          <p className="text-3xl sm:text-4xl font-bold text-black mt-2">We're here to help</p>
          <div className="w-16 h-1 bg-red-950 my-4 mx-auto"></div>
        </div>

        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-6 max-w-6xl">
          {contactDetails.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-2xl font-bold text-black">{contact.department}</div>
              <p className="text-base text-black mt-2">{contact.description}</p>
              <div className="text-lg font-bold text-blue-500 mt-3">{contact.contact}</div>
            </div>
          ))}
        </div>

        
        <section className="flex flex-col lg:flex-row gap-6 px-4 py-10 w-full max-w-6xl">
          
          <aside className="w-full lg:w-1/2 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-black">Don't be a stranger!</h2>
            <div className="text-2xl sm:text-3xl font-bold text-black">
              You tell us <RecordVoiceOverIcon /> We listen <HearingIcon />.
            </div>
            <p className="text-base sm:text-lg text-slate-600">
              Cras elementum finibus lacus nec lacinia. Quisque non convallis nisl, eu condimentum sem.
              Proin dignissim libero lacus, ut eleifend magna vehicula et. Nam mattis est sed tellus.
            </p>
          </aside>

          
          <aside className="w-full lg:w-1/2 bg-white rounded-xl shadow-md">
            <form className="w-full p-6 sm:p-10 flex flex-col gap-4">
              <input
                type="text"
                placeholder="NAME"
                maxLength={20}
                required
                className="p-3 text-gray-700 text-lg rounded-lg border border-gray-300"
              />
              <input
                type="email"
                placeholder="EMAIL"
                maxLength={30}
                required
                className="p-3 text-gray-700 text-lg rounded-lg border border-gray-300"
              />
              <input
                type="text"
                placeholder="SUBJECT"
                maxLength={50}
                required
                className="p-3 text-gray-700 text-lg rounded-lg border border-gray-300"
              />
              <textarea
                rows={6}
                placeholder="MESSAGE"
                required
                className="p-3 text-gray-700 text-lg rounded-lg border border-gray-300"
              ></textarea>
              <button
                type="submit"
                className="py-3 text-lg sm:text-xl text-white bg-blue-500 font-bold hover:bg-black rounded-lg"
              >
                SEND MESSAGE
              </button>
            </form>
          </aside>
        </section>
      </section>

      <Footer />
    </main>
  );
}

export default Page;
