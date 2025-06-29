import { useEffect, useState } from 'react';
import { GetProducts } from '@/networks/productnetworks';
import { AddToCart } from '@/networks/cartnetworks';
import toast from 'react-hot-toast';

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  sale_price: number;
  sizes: { size: string }[];
  colors: string[];
};

type CartRequestBody = {
  customer_id: string;
  product_id: string;
  quantity: number;
  size: string;
  color: string;
  total_price: number;
};

type ProductResponse = {
  success: boolean;
  data: Product[];
  message?: string;
};

function useProduct() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [userid, setUserId] = useState<string>('');
  const [item, setItem] = useState<Product | null>(null); 

  useEffect(() => {
    getProducts();
    const id = localStorage.getItem('user_id');
    if (id) {
      setUserId(id);
    }
  }, []);

  async function getProducts() {
    try {
      const response: ProductResponse = await GetProducts({});
      console.log('response------->', response);
      if (response.success) {
        setProducts(response.data);
      } else {
        console.error('Error in fetching products.');
      }
    } catch (error) {
      console.error('Product fetch failed', error);
    }
  }

  async function AddCart(data: Product) {
    try {
      const body: CartRequestBody = {
        customer_id: userid,
        product_id: data._id,
        quantity: 1,
        size: data.sizes[0]?.size || 'Default',
        color: data.colors[0] || 'Default',
        total_price: data.sale_price,
      };

      const res = await AddToCart(body);

      if (res.success) {
        toast.success('Added to Cart');
      } else if (res.message === 'cart is already here!') {
        toast.error('Item is already in the cart');
      } else {
        toast.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding to cart', error);
      toast.error('Something went wrong');
    }
  }

  return { products, AddCart, getProducts, userid, item, setItem };
}

export default useProduct;
