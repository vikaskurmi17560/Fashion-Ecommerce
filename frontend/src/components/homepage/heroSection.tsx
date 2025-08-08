'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const cards = [
  {
    id: 1,
    title: 'Latest Eyewear For You',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
    image:
      'https://res.cloudinary.com/dplwgsngu/image/upload/v1754550788/men-fashion-free-img_bqa1mn.jpg',
    shop: 'SHOP NOW',
  },
  {
    id: 2,
    title: "Let's Lorem Suit Up!",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
    image:
      'https://res.cloudinary.com/dplwgsngu/image/upload/v1754550815/footwear-free-img_gxjus2.jpg',
    shop: 'CHECK NOW',
  },
  {
    id: 3,
    title: '20% Off On Tank Tops',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
    image:
      'https://res.cloudinary.com/dplwgsngu/image/upload/v1754550845/women-fashion-free-img_vtfo1a.jpg',
    shop: 'SHOP NOW',
  },
];

const logos = [
  'https://res.cloudinary.com/dplwgsngu/image/upload/v1754550867/client-logo-4_gqdsos.png',
  'https://res.cloudinary.com/dplwgsngu/image/upload/v1754550893/client-logo-1_mcshvg.png',
  'https://res.cloudinary.com/dplwgsngu/image/upload/v1754550932/client-logo-2_ndkd7z.png',
  'https://res.cloudinary.com/dplwgsngu/image/upload/v1754550956/client-logo-3_ocptdy.png',
  'https://res.cloudinary.com/dplwgsngu/image/upload/v1754550978/client-logo-5_fa1zda.png',
];

function HeroSection() {
  const router = useRouter();

  const handleShopClick = () => {
    router.push('/products');
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-16 py-10 w-full gap-10">
      <div className="w-full overflow-hidden py-6">
        <div className="flex animate-infinite-scroll whitespace-nowrap gap-10">
          {logos.map((url, index) => (
            <img key={index} src={url} alt="client logo" className="h-12 md:h-16 object-contain" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative h-96 rounded-xl overflow-hidden shadow-lg bg-cover bg-center"
            style={{ backgroundImage: `url('${card.image}')` }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <div className="text-white space-y-3">
                <h2 className="text-xl md:text-2xl font-bold">{card.title}</h2>
                <p className="text-sm md:text-base">{card.description}</p>
                <button
                  onClick={handleShopClick}
                  className="px-5 py-2 mt-2 bg-white text-black font-semibold hover:bg-black hover:text-white transition"
                >
                  {card.shop}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;