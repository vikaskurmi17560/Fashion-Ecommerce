import { useEffect, useState } from 'react';
import { CartDelete, GetCart } from '../networks/authnetworks';
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
        setCarts(response.data); // Update state with the fetched cart data
      }
    } catch (error) {
      console.error('Error fetching carts:', error);
    }
  }

  async function deleteCart(id) {
    try {
      const response = await CartDelete({ cart_id: id });
      if (response.success) {
        getCarts(); // Refresh cart data after deletion
        toast.success("Item Removed")
      }
    } catch (error) {
      toast.success("Please wait...")
    }
  }

  return { carts, getCarts, deleteCart }; // Return state and functions
}

export default useCartInfo;
