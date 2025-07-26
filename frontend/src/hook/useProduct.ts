import { useEffect, useState } from 'react';
import { GetProducts } from '@/networks/productnetworks';

interface Product {
  _id: string;
  name: string;
  original_price: number;
  sale_price: number;
  brief_description: string;
  images: string[];
  cover_image: string;
  shipping_charge: number;
  stock: number;
  description: string;
  features: {
    feature: string;
    desc: string;
    feature_image: string[];
  }[];
  average_rating: number;
  colors: string[];
  sizes: {
    size: string;
    stock: number;
  }[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [userid, setUserId] = useState<string>('');
  const [item, setItem] = useState<Product | null>(null);

  useEffect(() => {
    getProducts();

    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('eco_user_id');
      if (id) setUserId(id);
    }
  }, []);

  async function getProducts() {
    try {
      const response = await GetProducts({});
      if (response?.success) {
        setProducts(response.data);
      } else {
        console.error('Error in fetching products.');
      }
    } catch (error) {
      console.error('Product not fetched:', error);
    }
  }

  return { products, getProducts, userid, item, setItem };
}

export default useProduct;
