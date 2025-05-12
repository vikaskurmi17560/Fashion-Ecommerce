import React from 'react';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import Link from 'next/link';
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
    photo: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/team4free-img.png",
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
  }
];

function Page() {
  return (
    <div className="w-full flex flex-col">
      <div className='w-full bg-fixed h-[75vh] bg-[url("https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/05/banner-04.jpg")] bg-no-repeat bg-cover'>
        <Navbar />
        <h1 className='text-center text-white text-5xl sm:text-6xl md:text-7xl font-extrabold mt-44 sm:mt-52 md:mt-56'>About Us</h1>
      </div>

      <div className="w-full bg-slate-100 py-12 px-6 sm:px-12 md:px-16">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 bg-white p-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus harum, temporibus, neque sunt nobis quas nisi iusto quia distinctio ipsa impedit adipisci tempora aperiam maxime totam ea repudiandae eum nostrum ducimus esse, doloribus inventore. Laborum ullam soluta dignissimos obcaecati, non nobis ratione explicabo ducimus deleniti?
            </p>
          </div>
          <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/slide-image-free-img.jpg" alt="About" className="w-full md:w-1/2 h-[300px] sm:h-[400px] object-cover rounded-md" />
        </div>
      </div>

      <div className="w-full py-16 px-4 sm:px-12 bg-white text-black">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-700 w-12 h-1" />
          </div>
          <h3 className="text-xl font-semibold">A Few Words About</h3>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">Our Team</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eos molestias modi atque suscipit quis vitae quasi? Numquam magni ipsum asperiores dicta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {Teams.map((member) => (
            <div key={member.id} className="bg-slate-100 p-6 rounded-md w-full max-w-xs flex flex-col items-center">
              <img src={member.photo} alt={member.name} className="w-32 h-32 object-cover mb-4" />
              <h4 className="text-xl font-bold">{member.name}</h4>
              <p className="text-gray-600">{member.Role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full h-auto py-16 bg-fixed bg-[url("https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/banner-05.jpg")] bg-cover bg-center flex justify-center'>
        <div className="bg-slate-100 bg-opacity-90 p-8 sm:p-12 w-[90%] md:w-[50%] flex flex-col items-center gap-6 rounded-lg shadow-md">
          <div className="bg-blue-700 w-16 h-1 mb-2" />
          <h2 className="text-3xl sm:text-5xl font-bold text-center">Follow Us</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="https://www.facebook.com/?_rdr" className="hover:text-blue-500">
              <FacebookIcon fontSize="large" />
            </Link>
            <Link href="https://www.instagram.com/" className="hover:text-pink-500">
              <InstagramIcon fontSize="large" />
            </Link>
            <Link href="https://www.youtube.com/" className="hover:text-red-600">
              <YouTubeIcon fontSize="large" />
            </Link>
            <Link href="https://www.google.co.in/" className="hover:text-green-600">
              <GoogleIcon fontSize="large" />
            </Link>
            <Link href="https://x.com/?lang=en" className="hover:text-blue-400">
              <TwitterIcon fontSize="large" />
            </Link>
            <Link href="/" className="hover:text-purple-600">
              <FitbitIcon fontSize="large" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Page;
