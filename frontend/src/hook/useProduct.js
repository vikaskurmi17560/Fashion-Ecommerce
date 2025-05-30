import { useEffect, useState } from 'react';
import { GetProducts } from '@/networks/productnetworks';
import { AddToCart} from'@/networks/cartnetworks'
import toast from 'react-hot-toast';

function useProduct() {
  
    const [products, setProducts] = useState([]);
    const [userid, setUserId] = useState("");
    const [item,setItem]=useState(null);
  
    useEffect(() => {
      getProducts();
      const id = localStorage.getItem("user_id");
      if (id) {
        setUserId(id);
      }
    }, []);
  
    async function getProducts() {
  
      try {
        const response = await GetProducts({});
        console.log("response------->", response);
        if (response.success) {
          setProducts(response.data);
        } else {
          console.log("error in fetching products.");
        }
      }
      catch (error) {
        console.log("product not fetch");
      }
  
    }
  
  
    async function AddCart(data) {
      try {
        const body = {
          customer_id: userid,
          product_id: data._id,
          quantity: 1,
          size: data.sizes[0].size,
          color: data.colors[0],
          total_price: data.sale_price,
        }
        const res = await AddToCart(body);
        if(res.success){
          toast.success("Add To Cart")
        }
        if(res.message === "cart is already here!"){
          toast.error("item is already into the  Cart")
        }
        
      }
      catch (error) {
  
        
      }
    }

    return {products,AddCart,getProducts,userid,item,setItem};
}

export default useProduct