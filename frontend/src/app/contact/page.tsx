import Navbar from '@/components/UI/Navbar'
import Footer from '@/components/UI/Footer'
import React from 'react'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import HearingIcon from '@mui/icons-material/Hearing';

const contactDetails = [
    { id:1,
      department: "Sales",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus.",
      contact: "1730 843 1245"
    },
    { id:2,
      department: "Complaints",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus.",
      contact: "1900 223 8899"
    },
    { id:3,
      department: "Returns",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus.",
      contact: "return07@gmail.com"
    },
    { id:4,
      department: "Marketing",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus.",
      contact: "1290 444 5493"
    }
  ];

function page() {
  return (
      <main className='w-auto h-auto '>
        <header className="flex flex-col  items-center justify-center bg-[url('https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/banner-06.jpg')] bg-fixed min-w-fit h-auto">
        <Navbar />
        <div className='w-[90%] flex flex-col items-center justify-center h-auto m-4 '>
            <div className="w-[80%] text-7xl font-extrabold text-white text-center m-4 p-56">
            CONTACT US
            </div>
        </div>
        </header>
         <main className='flex flex-col  items-center justify-center w-full h-auto bg-slate-100 ' >
           <section className='w-[90%] h-auto flex flex-col items-center py-12 '>
           <div className="w-full h-auto flex flex-col items-center ">
                <h1 className='text-black p-2 text-2xl font-bold text-center  w-full h-auto'>
                Have any queries?
                </h1>
                <div className='text-black text-6xl font-bold p-2 text-center  w-full h-auto'>
                    We're here to help
                    </div>
                    <div className="w-[5%]  bg-red-950 p-[1.5px] m-4" ></div>
                </div>
            <div className="w-full h-auto grid grid-cols-4 gap-5 px-4 py-2 pb-32">
            {
                contactDetails.map((contact)=>{
                    return (
                        <div className=" flex flex-col gap-2 px-3 py-10 items-center rounded-xl bg-white " key={contact.id}>
                              <div className="text-3xl font-bold text-black p-2">{contact.department}</div>
                              <div className=" text-xl  text-black text-center p-2">{contact.description}</div>
                              <div className="text-2xl font-bold text-blue-400 p-2">{contact.contact}</div>
                        </div>
                    )
                  })

            }
            </div>

            <section className='w-full h-auto flex flex-row gap-2 p-4 bg-slate-100 '>
            
            <aside className="w-[50%] h-auto  flex flex-col gap-2 ">
                <h1 className=' w-auto h-auto font-bold text-xl text-black'>Don't be a stranger!</h1>
                <div className=" w-auto h-auto flex flex-col gap-4 py-2">
                    <div className='text-3xl font-bold  w-auto h-auto text-black  '>You tell us <RecordVoiceOverIcon/> We listen  <HearingIcon/>  . </div>
                    <div className='text-xl w-auto h-auto text-slate-500  '>Cras elementum finibus lacus nec lacinia. Quisque non convallis nisl, eu condimentum sem. Proin dignissim libero lacus, ut eleifend magna vehicula et. Nam mattis est sed tellus.
                 </div>
                </div>
            </aside>


            <aside className="w-[50%] h-auto bg-white rounded-xl shadow-gray-200 shadow-md">
                   <form  className='w-full h-auto p-20 flex flex-col gap-5'>
                     <input type="text" placeholder='NAME'  maxLength={20} required className='p-2 text-slate-300 text-xl  rounded-lg border-2 '/>
                     <input type="email" placeholder='EMAIL'  maxLength={20} required className='p-2 text-slate-300 text-xl  rounded-lg border-2 '/>
                     <input type="text" placeholder='SUBJECT'  maxLength={20} required className='p-2 text-slate-300 text-xl rounded-lg  border-2 '/>
                     <textarea required className='p-2 text-slate-300 text-xl  rounded-lg border-2 ' rows={10} placeholder='MESSAGE'></textarea>
                     
                     <button type='submit'className='w-full h-auto py-3 text-2xl text-white bg-blue-500 font-bold hover:bg-black rounded-lg '>SEND MESSAGE</button>
                   </form>
            </aside>


            </section>
           </section>
             
         </main>
        <Footer />
    </main>
  )
}

export default page