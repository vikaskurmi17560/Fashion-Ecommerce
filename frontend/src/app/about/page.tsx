import Navbar from '@/components/UI/Navbar'
import React from 'react'
import Footer from '@/components/UI/Footer'
import Link from 'next/link'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FitbitIcon from '@mui/icons-material/Fitbit';
const Teams = [
    {
        id: 1,
        photo: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/team2-free-img.png",
        name: "Harvey Spector",
        Role: "Founder - CEO"
    },
    {
        id: 6,
        photo: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/team1-free-img.png",
        name: "Jessica Pearson",
        Role: "COO"
    },
    {
        id: 2,
        photo: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/team3-free-img.png",
        name: "Rachel Zain",
        Role: "Marketing Head"
    },
    {
        id: 3,
        photo: "	https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/team4free-img.png",
        name: "Luise Litt",
        Role: "Lead Developer"
    },
    {
        id: 4,
        photo: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/team5-free-img.png",
        name: "Katrina Bennett",
        Role: "Intern Designer"
    },
    {
        id: 5,
        photo: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/team6-free-img.png",
        name: "Mike Ross",
        Role: "Intern Designer"
    },

]
function page() {
    return (
        <div className='w-screen h-auto flex flex-col '>
               
                <div className='w-screen flex flex-col  bg-fixed h-[75vh] bg-[url("https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/05/banner-04.jpg")]  bg-no-repeat'>
                <Navbar />
                    <h1 className='text-center  text-white text-7xl font-extrabold w-screen mt-56 '>About Us</h1>
                </div>
                <div className="flex flex-col w-full h-full  bg-slate-100 ">
                    <div className=" w-full flex flex-row py-12 px-16">
                        <div className=' bg-none w-[80%] h-[50vh]flex flex-col bg-white'>
                            <h1 className='text-5xl text-black font-semibold p-6 pb-8'>Who We Are</h1>
                            <p className='w-full p-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus harum, temporibus, neque sunt nobis quas nisi iusto quia distinctio ipsa impedit adipisci tempora aperiam maxime totam ea repudiandae eum nostrum ducimus esse, doloribus inventore. Laborum ullam soluta dignissimos obcaecati, non  nobis ratione explicabo ducimus deleniti?</p>
                        </div>
                        <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/slide-image-free-img.jpg" alt="photo_hii_to_hai" className='w-[80%] h-[50vh] ' />
                    </div>
                </div>
            
            <div className=" w-screen h-auto ">
                <div className="w-full h-auto p-12 text-black flex flex-col gap-6  items-center bg-center">
                    <div className="w-[90%] flex justify-center p-1">
                        <div className="bg-blue-700 w-[5%] p-[2px]"></div>
                    </div>
                    <h1 className="w-[90%] text-2xl text-center font-extrabold">A Few Words About</h1>
                    <div className="text-black flex flex-col items-center">
                        <h1 className="w-[50%] text-6xl font-semibold text-center">Our Team</h1>
                        <div className="p-2 w-[50%]"></div>
                        <p className=' w-[50%] text-center  text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eos molestias modi atque suscipit quis vitae quasi? Numquam magni ipsum asperiores dicta, officia voluptates qui reprehenderit quasi nobis?
                        </p>
                    </div>
                    <div className="w-[60%] m-16 grid grid-cols-3 gap-4 ">

                        {
                            Teams.map((member) => (
                                <div key={member.id} className="p-12 bg-slate-100 rounded-md">
                                    <div className="flex items-center flex-col bg-slate-100">

                                        <img src={member.photo} alt="photo" className='mb-6' />
                                        <h1 className='text-center w-full text-2xl font-bold' >{member.name}</h1>
                                        <h1 className='text-center w-full text-xl' >{member.Role}</h1>

                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className='w-screen h-[75vh] bg-fixed flex justify-center bg-[url("https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/banner-05.jpg")]'>
                    <div className="w-[35%] h-[75vh] text-black bg-slate-100 flex flex-col gap-6 justify-center items-center ">
                        <div className="w-[90%] flex justify-center p-1">
                            <div className="bg-blue-700 w-[25%] p-[2px]"></div>
                        </div>
                        <h1 className='w-[90%] font-extrabold text-center text-6xl  '>Follow Us</h1>
                        <div className=' w-[90%] flex flex-row py-16 px-12 gap-2 justify-center'>
                            <div>
                                <div className="rounded-full p-6">
                                    <Link href={"https://www.facebook.com/?_rdr"} className='hover:text-blue-500 focus:text-red-600' > <FacebookIcon /> </Link>
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-6">
                                    <Link href={"https://www.instagram.com/"} className='hover:text-blue-500 focus:text-red-600' > <InstagramIcon /> </Link>
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-6">
                                    <Link href={"https://www.youtube.com/"} className='hover:text-blue-500 focus:text-red-600' > <YouTubeIcon />  </Link>
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-6">
                                    <Link href={"https://www.google.co.in/"} className='hover:text-blue-500 focus:text-red-600' >  <GoogleIcon />  </Link>
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-6">
                                    <Link href={"https://x.com/?lang=en"} className='hover:text-blue-500 focus:text-red-600' > <TwitterIcon />  </Link>
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-6">
                                    <Link href={"/"} className='hover:text-blue-500'><FitbitIcon /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default page