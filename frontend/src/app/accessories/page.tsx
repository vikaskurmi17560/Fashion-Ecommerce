'use client';

import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import useProduct from '@/hook/useProduct';
import { useRouter } from 'next/navigation';
import Filter from '@/components/productpage/filters';
import Navbar from '@/components/UI/Navbar'; 

function Page() {
  const { AddCart, products, setItem } = useProduct();
  const router = useRouter();

  const filteredProducts = products.filter(item => item.category === 'accessories');

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        
      
        <div className="w-full lg:w-1/4 px-4 py-6 border-r border-gray-200">
          <Filter />
        </div>

       
        <main className="w-full lg:w-3/4 px-4 py-6 md:px-6 lg:px-10">
          <div className="text-gray-400 font-semibold text-lg sm:text-xl mb-4">
            <Link href="/">Home</Link> / Men
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 text-xl">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: any, index: number) => (
                <div
                  className="flex flex-col rounded-lg border border-slate-300 p-4 gap-3 shadow hover:shadow-md transition duration-200"
                  key={index}
                >
                  <img
                    src={product.cover_image}
                    alt={product.name}
                    className="h-48 w-full object-contain cursor-pointer"
                    onClick={() => {
                      setItem(product);
                      router.push(`/product?product_id=${product._id}`);
                    }}
                  />

                  <div className="text-base sm:text-lg font-bold">{product.name}</div>
                  <div className="text-slate-500 text-sm sm:text-base">{product.category}</div>
                  <div className="text-base sm:text-lg font-semibold text-black">
                    $ {product.sale_price}
                  </div>

                  <div className="flex gap-2">
                    {product.colors?.map((color: string, i: number) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-full border"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(Math.floor(product.average_rating || 0))].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                    {(product.average_rating || 0) % 1 !== 0 && <StarHalfIcon />}
                  </div>

                  <button
                    className="w-full py-2 mt-2 bg-blue-600 text-white text-sm sm:text-base font-semibold hover:bg-black transition rounded-md"
                    onClick={() => AddCart(product)}
                  >
                    ADD TO CART
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Page;
