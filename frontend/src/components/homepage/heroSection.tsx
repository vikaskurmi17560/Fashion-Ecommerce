import React from 'react';

const cards = [
  {
    id: 1,
    title: 'Latest Eyewear For You',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.​',
    image:
      'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg',
    shop: 'SHOP NOW',
  },
  {
    id: 2,
    title: "Let's Lorem Suit Up!",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.​',
    image:
      'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg',
    shop: 'CHECK NOW',
  },
  {
    id: 3,
    title: '20% Off On Tank Tops',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum',
    image:
      'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/women-fashion-free-img.jpg',
    shop: 'SHOP NOW',
  },
];

const Logos = [
  {
    url: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-4.png',
    id: '1',
  },
  {
    url: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-1.png',
    id: '2',
  },
  {
    url: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-2.png',
    id: '3',
  },
  {
    url: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-3.png',
    id: '4',
  },
  {
    url: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/client-logo-5.png',
    id: '5',
  },
  {
    url: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-4.png',
    id: '6',
  },
];

function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-16 py-10 w-full gap-10">
      {/* Logo Carousel */}
      <div className="w-full overflow-hidden py-6">
        <div className="flex animate-infinite-scroll whitespace-nowrap gap-10">
          {Logos.map((logo) => (
            <img
              key={logo.id}
              src={logo.url}
              alt="client logo"
              className="h-12 md:h-16 object-contain"
            />
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative h-96 rounded-xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${card.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <div className="text-white space-y-3">
                <h2 className="text-xl md:text-2xl font-bold">{card.title}</h2>
                <p className="text-sm md:text-base">{card.description}</p>
                <button className="px-5 py-2 mt-2 bg-white text-black font-semibold hover:bg-black hover:text-white transition">
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
