import React from 'react';

const cards = [
    {
        id: 1,
        title: "Latest Eyewear For You",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.​",
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg",
        shop: "SHOP NOW",


    },
    {
        id: 2,
        title: "Let's Lorem Suit Up!",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.​",
        image: "	https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg",
        shop: "CHECK NOW",
    },
    {
        id: 3,
        title: "20% Off On Tank Tops",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum",
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/women-fashion-free-img.jpg",
        shop: "SHOP NOW",

    },
    // Add more products here...
];

const Logos = [
    {
        url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-4.png",
        id: "1 ",
    },
    {
        url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-1.png",
        id: "2 ",
    },
    {
        url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-2.png",
        id: "3 ",
    },
    {
        url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-3.png",
        id: "4 ",
    },
    {
        url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/client-logo-5.png",
        id: "5 ",
    },
    {
        url: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-4.png",
        id: "6 ",
    },
    

]

function HeroSection() {
    return (
        <div className="ml-16 flex flex-1 flex-col items-center justify-center  h-screen w-[92.5%] gap-5">
            {/* Hero Section with Logo Carousel */}
            <div className="w-full flex flex-col justify-center items-center">
                <div
                    x-data="{}"
                    x-init="$nextTick(() => {
            let ul = $refs.logos;
            ul.insertAdjacentHTML('afterend', ul.outerHTML);
            ul.nextSibling.setAttribute('aria-hidden', 'true');
          })"
                    className="mt-10 mb-10  w-full items-center inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
                >

                    {Logos.map((logo) => (
                        <ul
                            key={logo.id}
                            x-ref="logos"
                            className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
                        >
                            <li>
                                <img
                                    src={logo.url}
                                    alt="img"
                                />
                            </li>

                        </ul>
                    ))}

                </div>
            </div>

            {/* Cards Section */}
            <div className="w-[92.5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className=" "
                        style={{
                            backgroundImage: `url(${card.image})`, // Dynamically set the background image
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="flex flex-col items-center mt-60 ">
                            <div className=" p-4 flex flex-col  bg-black/20 gap-5  ">
                                <h2 className="text-3xl font-bold  text-white">{card.title}</h2>
                                <p className="text-white text-sm leading-8 mt-2">{card.description}</p>
                                <button className='w-[50%] px-6 py-2 bg-white text-black mt-2 mb-3 hover:bg-black hover:text-white'>{card.shop}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default HeroSection;
