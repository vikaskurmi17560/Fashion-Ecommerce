'use client';

import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import useProduct from '@/hook/useProduct';
import { useRouter } from 'next/navigation';
import useCart from '@/hook/useCart';

function AllProducts() {
  const { products, setItem } = useProduct();
  const { AddCart } = useCart();
  const router = useRouter();

  return (
    <main className="w-full min-h-screen bg-white px-4 py-8 md:px-10 lg:px-20">
      <div className="text-gray-400 font-semibold text-lg sm:text-xl mb-4">
        <Link href="/">Home</Link> / Store
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg transition duration-200 bg-white h-[430px]"
          >

            <div
              className="w-full h-[140px] flex items-center justify-center cursor-pointer"
              onClick={() => {
                setItem(product);
                router.push(`/product?product_id=${product._id}`);
              }}
            >
              <img
                src={product.cover_image}
                alt={product.name}
                className="max-h-full object-contain transition-transform duration-200 hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-1 mt-3">

              <div className="text-base sm:text-lg font-bold text-slate-700 truncate">
                {product.name}
              </div>

              <div className="text-slate-500 text-sm sm:text-base truncate">
                {product.category}
              </div>


              <div className="text-base sm:text-lg font-semibold text-black">
                ₹ {product.sale_price}
              </div>


              <div className="flex gap-2 mt-1">
                {product.colors.map((color: string, index: number) => (
                  <div
                    key={index}
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>


              <div className="flex items-center gap-1 text-yellow-500 mt-1">
                {[...Array(Math.floor(product.average_rating))].map((_, index) => (
                  <StarIcon key={`star-${index}`} fontSize="small" />
                ))}
                {product.average_rating % 1 !== 0 && (
                  <StarHalfIcon fontSize="small" />
                )}
              </div>


              {product.brief_description && (
                <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                  {product.brief_description}
                </div>
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
    </main>
  );
}

export default AllProducts;
