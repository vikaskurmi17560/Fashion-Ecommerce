import React from 'react';

const features = [
    {
        id: 1,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe3-300x300.jpg",
        name: "Yellow Shoes",
        category: "Men",
        price: 250,
    },
    {
        id: 2,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg",
        name: "Blue Shoes",
        category: "Men",
        price: 250,
    },
    {
        id: 3,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-m-jeans1-300x300.jpg",
        name: "Brown Jeans",
        category: "Men",
        price: 250,
    },
    {
        id: 4,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans2-300x300.jpg",
        name: "Denim Jeans",
        category: "Women",
        price: 250,
    },
    {
        id: 5,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans4-300x300.jpg",
        name: "Gray Jeans",
        category: "Women",
        price: 250,
    },
    {
        id: 6,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans1-300x300.jpg",
        name: "Denim Shorts",
        category: "Women",
        price: 250,
    },
    {
        id: 7,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory2-300x300.jpg",
        name: "Anchor Bracelet",
        category: "Accessories",
        price: 250,
    },
    {
        id: 8,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/product-accessory1-b-300x300.jpg",
        name: "Boho Bangle Bracelet",
        category: "Accessories",
        price: 250,
    },
    {
        id: 9,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag1-300x300.jpg",
        name: "Light Brown Purse",
        category: "Accessories",
        price: 250,
    },
    {
        id: 10,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag3-300x300.jpg",
        name: "Bright Red Bag",
        category: "Accessories",
        price: 250,
    },
];

function FeatureSection() {
    return (
        <section className="w-full h-auto flex flex-col justify-center items-center lg:pt-36 md:pt-20 pt-10 bg-gray-400/20">
            <h1 className="lg:text-7xl md:text-3xl text-xl text-black font-bold text-center underline underline-offset-3 lg:mb-20 md:mb-10 mb-5">
                Featured Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6 md:gap-4 gap-2 lg:m-5 md:m-3 m-2">
                {features.map((product) => (
                    <article key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-40 md:h-48 lg:h-56 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-black lg:text-xl md:text-sm text-[12px] font-semibold">{product.name}</h2>
                            <h3 className="text-gray-600 lg:text-sm md:text-[15px] text-[8px]">{product.category}</h3>
                            <p className="text-black lg:text-sm md:text-[15px] text-[8px] font-bold">₹{product.price}</p>
                        </div>
                    </article>
                ))}
            </div>

            <div className="bg-fixed lg:m-10 md:m-5 m-2 h-screen flex flex-col justify-center items-center bg-[url('https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/banner-03.jpg')] bg-cover bg-no-repeat bg-center">
                <div className="w-[90%] flex flex-col lg:gap-10 md:gap-5 gap-2">
                    <h2 className="text-white lg:text-3xl md:text-xl text-[15px] font-semibold">Limited Time Offer</h2>
                    <h1 className="text-white lg:text-6xl md:text-3xl text-xl font-bold">Special Edition</h1>
                    <p className="text-white lg:leading-8 md:leading-6 leading-4 w-[70%]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, nostrum alias? Laboriosam, officia distinctio voluptatem nihil officiis tempora fugit non dignissimos aliquid ex numquam ratione quas perferendis sapiente, magni repudiandae?
                    </p>
                    <p className="text-white lg:text-3xl md:text-xl text-[15px] font-semibold">Buy This T-shirt At 20% Discount, Use Code OFF20</p>
                    <button
                        aria-label="Shop now and get discount"
                        className="bg-white text-black lg:px-4 md:px-2 px-1 py-1 w-[20vh] h-[8vh] lg:mb-10 md:mb-5 mb-2 hover:bg-black hover:text-white transition-colors"
                    >
                        SHOP NOW
                    </button>
                </div>
            </div>
        </section>
    );
}

export default FeatureSection;
