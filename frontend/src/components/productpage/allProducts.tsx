'use client'

import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import useProduct from '@/hook/useProduct'
import { useRouter } from 'next/navigation';

function allProducts() {
  const { AddCart, products, setItem } = useProduct();
  const route = useRouter();
  return (
    <main className='w-[75%] min-h-screen bg-white m-4 mr-16 items-center'>
      <div className='text-gray-400 font-semibold mx-24 mt-24 mb-6'><Link href={"/"}>Home</Link>/Store</div>
      <div className="grid grid-cols-3 w-[90%]  py-16 mx-20 my-12 gap-6 ">
        {
          products.map((product: any) => {
            return (
              <div className="flex flex-col rounded-md border-2 border-slate-300 p-4 gap-2" key={product._id}>
                <img
                  src={product.cover_image}
                  alt="img"
                  className="h-60 w-60 mx-auto cursor-pointer"
                  onClick={() => {
                    setItem(product); // Set the product ID first
                    route.push(`/product?product_id=${product._id}`); // Then navigate to the product page
                  }}
                />

                <div>
                  <div className="text-xl font-bold">{product.name}</div>
                  <div className="text-slate-400 text-xl">{product.category}</div>
                  <div className='text-xl '>$ {product.sale_price}</div>
                </div>
                <div className=" flex flex-row">
                  {
                    product.colors.map((color: any) => {
                      return (
                        <div className={`bg-${color} h-4 w-4 rounded-full`} key={color._id}></div>
                      )
                    })
                  }
                </div>

                <div className="rating flex flex-row ">
                  {

                    [...Array(Math.floor(product.average_rating))].map((_, index) => (
                      <div key={`full-star-${index}`}>
                        <StarIcon />
                      </div>
                    ))
                  }
                  {
                    product.average_rating % 1 !== 0 && (
                      <div>
                        <StarHalfIcon />
                      </div>
                    )
                  }
                </div>

                <button
                  className="w-auto py-2 text-center bg-blue-500 text-xl font-bold hover:bg-black hover:text-white rounded-md"
                  onClick={() => AddCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            );
          })
        }

      </div>
    </main>
  )
}

export default allProducts