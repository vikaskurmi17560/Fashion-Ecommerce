'use client';

import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import useProduct from '@/hook/useProduct';
import { useRouter } from 'next/navigation';
import useCart from '@/hook/useCart';

function AllProducts() {
  const { products, setItem } = useProduct();
  const { AddCart} =useCart();
  const router = useRouter();
  return (
    <main className="w-full min-h-screen bg-white px-4 py-8 md:px-10 lg:px-20">
      <div className="text-gray-400 font-semibold text-lg sm:text-xl mb-4">
        <Link href="/">Home</Link> / Store
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any, index: number) => (
          <div
            className="flex flex-col rounded-lg border border-slate-300 p-4 gap-3 shadow hover:shadow-md transition duration-200"
            key={index}
          >
            <img
              src={product.cover_image}
              alt="img"
              className="h-48 w-full object-contain cursor-pointer"
              onClick={() => {
                setItem(product);
                router.push(`/product?product_id=${product._id}`);
              }}
            />

            <div className="text-base sm:text-lg font-bold text-slate-700">{product.name}</div>
            <div className="text-slate-500 text-sm sm:text-base">{product.category}</div>
            <div className="text-base sm:text-lg font-semibold text-black">$ {product.sale_price}</div>

            <div className="flex gap-2">
              {product.colors.map((color: string, index: number) => (
                <div
                  key={index}
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>

            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(Math.floor(product.average_rating))].map((_, index) => (
                <StarIcon key={`star-${index}`} />
              ))}
              {product.average_rating % 1 !== 0 && <StarHalfIcon />}
            </div>

            <button
              className="w-full py-2 mt-2 bg-blue-600 text-white text-sm sm:text-base font-semibold hover:bg-black transition rounded-md"
              onClick={() => {
                AddCart(product)
              }}
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
