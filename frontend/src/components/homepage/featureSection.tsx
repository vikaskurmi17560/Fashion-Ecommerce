import React from 'react';

const features = [
    {
        id: 1,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe3-300x300.jpg",
        name: "Yellow Shoes",
        categaroy: "Men",
        price: "$250",
    },
    {
        id: 2,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg",
        name: "Blue Shoes",
        categaroy: "Men",
        price: "$250",
    },
    {
        id: 3,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-m-jeans1-300x300.jpg",
        name: "Brown Jeans",
        categaroy: "Men",
        price: "$250",
    },
    {
        id: 4,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans2-300x300.jpg",
        name: "Denim Jeans",
        categaroy: "Women",
        price: "$250",
    },
    {
        id: 5,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans4-300x300.jpg",
        name: "Gray Jeans",
        categaroy: "Women",
        price: "$250",
    },
    {
        id: 6,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans1-300x300.jpg",
        name: "Denim Shorts",
        categaroy: "Women",
        price: "$250",
    },
    {
        id: 7,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory2-300x300.jpg",
        name: "Anchor Bracelet",
        categaroy: "Accessories",
        price: "$250",
    },
    {
        id: 8,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/product-accessory1-b-300x300.jpg",
        name: "Boho Bangle Bracelet",
        categaroy: "Accessories",
        price: "$250",
    },
    {
        id: 9,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag1-300x300.jpg",
        name: "Light Brown Purse",
        categaroy: "Accessories",
        price: "$250",
    },
    {
        id: 10,
        image: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag3-300x300.jpg",
        name: "Bright Red Bag",
        categaroy: "Accessories",
        price: "$250",
    },
];

function FeatureSection() {
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center pt-36 mt-10 bg-gray-400/20">
            <h1 className="text-7xl text-black font-bold text-center  underline underline-offset-3  mb-20">
                Featured Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-5">
                {features.map((product) => (
                    <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-black text-xl font-semibold">{product.name}</h2>
                            <h3 className="text-gray-600 text-sm">{product.categaroy}</h3>
                            <p className="text-black font-bold">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className=" bg-fixed m-10  h-screen  flex flex-col justify-center items-center   bg-[url('https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/banner-03.jpg')]  bg-cover bg-no-repeat bg-center  ">
                <div className="w-[90%]  flex flex-col  gap-10 ">
                    <h1 className="text-white text-3xl font-semibold ">Limited Time Offer</h1>
                    <h1 className="text-white text-6xl font-bold ">Special Edition</h1>
                    <h1 className="text-white leading-8 w-[70%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, nostrum alias? Laboriosam, officia distinctio voluptatem nihil officiis tempora fugit non dignissimos aliquid ex numquam ratione quas perferendis sapiente, magni repudiandae?</h1>
                    <h1 className="text-white text-3xl font-semibold ">Buy This T-shirt At 20% Discount, Use Code OFF20</h1>
                    <button className="bg-white text-black px-4 py-1 w-[20vh] h-[8vh] mb-10 hover:bg-black hover:text-white ">SHOP NOW</button>
                </div>
            </div>
           

        </div>
    );
}

export default FeatureSection;
