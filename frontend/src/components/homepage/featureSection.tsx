'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/service/productstore';

function FeatureSection() {
  const router = useRouter();
  const { products, fetchProducts, loading, filterByCategory } = useProductStore();

  
  useEffect(() => {
    fetchProducts(1);
  }, [filterByCategory]);

  const handleNavigate = (productId: string) => {
    router.push(`/product?product_id=${productId}`);
  };

  if (loading) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <p className="text-lg font-medium">Loading products...</p>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <p className="text-lg font-medium">No products found.</p>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center lg:pt-36 md:pt-20 pt-10 bg-gray-100 px-4">
      <h1 className="lg:text-7xl md:text-3xl text-xl text-black font-bold text-center underline underline-offset-4 lg:mb-20 md:mb-10 mb-5">
        Featured Products
      </h1>

      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl w-full">
        {products.map((product) => (
          <article
            key={product._id}
            onClick={() => handleNavigate(product._id)}
            className="bg-white rounded-xl shadow hover:shadow-xl transition-all cursor-pointer overflow-hidden"
          >
            <div className="relative w-full h-56 bg-white flex items-center justify-center">
              <img
                src={product.cover_image}
                alt={product.name}
                loading="lazy"
                className="object-contain w-full h-full p-2"
              />
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-black font-semibold text-lg truncate">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1 capitalize">{product.category}</p>

              {product.colors?.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {product.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-5 h-5 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              )}

              <p className="text-black font-bold text-lg mt-3">₹{product.sale_price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;