'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import useCart from '@/hook/useCart';
import { useProductStore } from '@/service/productstore';

function AllProducts() {
  const { AddCart } = useCart();
  const router = useRouter();

  const {
    products,
    currentPage,
    totalPages,
    loading,
    fetchProducts,
    setCurrentPage,
    filterByCategory,
    filterByPrice,
    searchTerm,
  } = useProductStore();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, filterByCategory, filterByPrice, searchTerm]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderLoader = () => {
    return [...Array(8)].map((_, idx) => (
      <div
        key={idx}
        className="animate-pulse flex flex-col justify-between rounded-2xl border border-slate-200 p-2 shadow-sm bg-white
          h-[430px] sm:h-[430px] md:h-[430px] lg:h-[430px]"
      >
        <div className="w-full h-[140px] bg-gray-300 rounded-md mb-3" />
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-1 w-3/4"></div>
        <div className="h-5 bg-gray-300 rounded mb-2 w-1/2"></div>
        <div className="flex gap-2 mt-1">
          <div className="h-4 w-4 bg-gray-300 rounded-full" />
          <div className="h-4 w-4 bg-gray-300 rounded-full" />
          <div className="h-4 w-4 bg-gray-300 rounded-full" />
        </div>
        <div className="h-4 bg-gray-300 rounded mt-2 w-1/3"></div>
        <div className="h-10 bg-gray-400 rounded mt-3"></div>
      </div>
    ));
  };

  return (
    <main className="w-full bg-white px-4 md:px-4 lg:px-10 flex flex-col gap-2">
      <div className="text-gray-400 font-semibold my-2 text-lg sm:text-xl">
        Home / {filterByCategory}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? renderLoader() : products.map(product => (
          <div
            key={product._id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 p-2 shadow-sm hover:shadow-lg transition duration-200 bg-white h-[430px]"
          >
            <div
              className="w-full h-[140px] flex items-center justify-center cursor-pointer"
              onClick={() => router.push(`/product?product_id=${product._id}`)}
            >
              <img
                src={product.cover_image}
                alt={product.name}
                className="max-h-full object-contain transition-transform duration-200 hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <div className="text-base sm:text-lg font-bold text-slate-700 truncate">{product.name}</div>
              <div className="text-slate-500 text-sm sm:text-base truncate">{product.category}</div>
              <div className="text-base sm:text-lg font-semibold text-black">₹ {product.sale_price}</div>
              <div className="flex gap-2 mt-1">
                {product.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 text-yellow-500 mt-1">
                {[...Array(Math.floor(product.average_rating))].map((_, idx) => (
                  <StarIcon key={idx} fontSize="small" />
                ))}
                {product.average_rating % 1 !== 0 && <StarHalfIcon fontSize="small" />}
              </div>
              {product.brief_description && (
                <div className="text-sm text-gray-500 line-clamp-2 mt-1">{product.brief_description}</div>
              )}
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 mt-4 w-full"
              onClick={() => AddCart(product)}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-between gap-4 text-sm font-semibold text-white px-5 py-2">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Prev
        </button>

        <button className="border-black border-2 p-3 bg-blue-500 rounded-md">
          {currentPage} / {totalPages}
        </button>

        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default AllProducts;
