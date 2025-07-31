'use client';
import Navbar from '@/components/UI/Navbar';
import React, { useEffect, useState } from 'react';
import Footer from '@/components/UI/Footer';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useSearchParams } from 'next/navigation';
import { GetProduct } from '@/networks/productnetworks';
import Link from 'next/link';
import useCart from '@/hook/useCart';

function Page() {
    const { AddCart } = useCart();
    const [item, setItem] = useState<any>(null);
    const [option, setOption] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const params = useSearchParams();
    const id = params.get("product_id");

    async function handleItem() {
        if (!id) return;
        setLoading(true);
        const data = await GetProduct(id);
        setLoading(false);
        if (data.success) {
            setItem(data.data);
        }
    }

    useEffect(() => {
        handleItem();
    }, [id]);

    const renderColorSwatches = (colors: string[] | string | null | undefined) => {
        const colorArray = Array.isArray(colors)
            ? colors
            : typeof colors === 'string'
                ? colors.split(',')
                : [];

        return (
            <div className="flex flex-wrap gap-2">
                {colorArray.map((color, i) => (
                    <div
                        key={i}
                        title={color.trim()}
                        style={{ backgroundColor: color.trim() }}
                        className="w-6 h-6 rounded-full border border-gray-400 shadow-md"
                    />
                ))}
            </div>
        );
    };

    const renderAverageRating = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} />)}
                {halfStar && <StarHalfIcon />}
                {[...Array(emptyStars)].map((_, i) => (
                    <StarIcon key={`empty-${i}`} className="text-gray-300" />
                ))}
            </div>
        );
    };

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Submitted review with rating: ${selectedRating}`);
    };

    if (loading) {
        return (
            <main className="w-full min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-xl">Loading product...</p>
            </main>
        );
    }

    if (!item) {
        return (
            <main className="w-full min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-xl">Product not found.</p>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-slate-50">
            <Navbar />

            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col h-fit lg:flex-row gap-10">

                    <div className="w-full lg:w-1/2 h-[85vh] flex items-center justify-center">
                        <img
                            src={item.cover_image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <nav className="text-sm text-gray-500">
                            <Link href="/" className="hover:underline">
                                Home
                            </Link>{' '}
                            /{' '}
                            <Link href="#" className="hover:underline">
                                {item.category}
                            </Link>{' '}
                            / <span>{item.name}</span>
                        </nav>

                        <h2 className="text-gray-600 text-base">{item.category}</h2>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{item.name}</h1>
                        <p className="text-xl text-green-600 font-semibold">
                            ₹{item.sale_price}
                            <span className="line-through text-gray-500 text-lg ml-2">
                                ₹{item.original_price}
                            </span>
                        </p>
                        <div className='flex flex-col gap-2'>
                            <span className="text-gray-700 font-semibold">Product Description:</span>
                            <p className="text-gray-600">{item.brief_description}</p>
                        </div>

                        {item.sizes && item.sizes.length > 0 && (
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.sizes.map((size: number | any, index: number | any) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{size.size}</td>
                                            <td className="border border-gray-300 px-4 py-2">{size.stock}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}


                        <div className="flex flex-row lg:gap-24 gap-12">
                            <div className="flex flex-col gap-2">
                                <span className="text-gray-700 font-semibold">Available Colors:</span>
                                {renderColorSwatches(item.colors)}
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className='text-gray-700 font-semibold'>Rating:</span>
                                {renderAverageRating(item.average_rating)}
                            </div>
                        </div>

                        <button
                            onClick={() => AddCart(item)}
                            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full sm:w-fit"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>


                <div className="flex gap-6 mt-12 border-b border-gray-300 text-lg font-semibold">
                    {['Description', 'Additional Info', 'Reviews (0)'].map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setOption(i)}
                            className={`pb-2 transition-all duration-200 border-b-2 ${option === i ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-black'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="mt-8">
                    {option === 0 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-800">Product Description</h3>
                            <p className="text-gray-600 leading-relaxed">{item.description || 'No description available.'}</p>
                            <div className="flex flex-col gap-8 mt-8">
                                {item.features?.map((feature: any, index: any) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center shadow-lg rounded-xl overflow-hidden border`}
                                    >

                                        <div className="w-full md:w-[45%] bg-white flex items-center justify-center p-6 h-72">
                                            {feature.feature_image?.[0] && (
                                                <img
                                                    src={feature.feature_image[0]}
                                                    alt={feature.feature}
                                                    className="h-full w-full object-contain"
                                                />
                                            )}
                                        </div>


                                        <div className="w-full md:w-[55%] p-6 bg-gray-50">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.feature}</h3>
                                            <p className="text-gray-600 text-lg">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>
                    )}

                    {option === 1 && (
                        <div className="mt-4 space-y-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-gray-700 font-semibold">Color:</span>
                                {renderColorSwatches(item.colors)}
                            </div>
                            <span>Size And Stock:</span>
                            {item.sizes && item.sizes.length > 0 && (
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.sizes.map((size: number | any, index: number | any) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 px-4 py-2">{size.size}</td>
                                                <td className="border border-gray-300 px-4 py-2">{size.stock}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                        </div>
                    )}

                    {option === 2 && (
                        <div className="space-y-6">
                            <p className="text-gray-600 text-lg">There are no reviews yet.</p>
                            <div className="border rounded-xl p-6 bg-white shadow">
                                <h4 className="text-2xl font-bold mb-2">Be the first to review “{item.name}”</h4>
                                <p className="text-gray-500 text-base">
                                    Your email address will not be published. Required fields are marked *
                                </p>


                                <div className="flex items-center space-x-1 text-yellow-500 mt-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon
                                            key={star}
                                            className={`cursor-pointer transition ${(hoveredRating ?? selectedRating) >= star ? 'text-yellow-500' : 'text-gray-300'
                                                }`}
                                            onClick={() => setSelectedRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(null)}
                                        />
                                    ))}
                                </div>

                                <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
                                    <div className="flex flex-col">
                                        <label className="text-sm font-semibold text-gray-700 mb-1">Your Review *</label>
                                        <textarea className="border rounded p-3 w-full" rows={4} required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Name*"
                                            className="border rounded p-3"
                                        />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Email*"
                                            className="border rounded p-3"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full sm:w-fit"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default Page;