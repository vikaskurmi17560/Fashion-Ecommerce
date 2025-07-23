import { useEffect, useState } from 'react';
import { CartDelete, GetCart } from '../networks/cartnetworks'
import toast from 'react-hot-toast';

 function useCartInfo() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getCarts();
  }, []);

  async function getCarts() {
    try {
      const response = await GetCart({});
      if (response.success) {
        setCarts(response.data); 
      }
    } catch (error) {
      console.error('Error fetching carts:', error);
    }
  }

  async function deleteCart(id) {
    try {
      const response = await CartDelete({ cart_id: id });
      if (response.success) {
        getCarts(); 
        toast.success("Item Removed")
      }
    } catch (error) {
      toast.success("Please wait...")
    }
  }

  return { carts, getCarts, deleteCart }; 
}

export default useCartInfo;
