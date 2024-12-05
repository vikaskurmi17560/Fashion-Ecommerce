import {
    CartCreateUrl,
    CartDeleteUrl,
    CartGetUrl,
  } from "@/constants";
  import axios from "axios";

export async function AddToCart(body: any) {
    try {
      const response = await axios.post(`${CartCreateUrl}`,body);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
 
  
  export async function GetCart(Params:any){
    try{
      const response= await axios .get(`${CartGetUrl}?customer_id=6740a7f94e07c8eb0e197b6b`);
      return response.data;
    }catch(error){
      console.error(error);
      throw error;
    }
  
  }
 

  export async function CartDelete(params:any){
    try{
         const response = await axios.post(`${CartDeleteUrl}?cart_id=${params.cart_id}`);
         return response.data;
    }
    catch(error){
      console.error(error);
      throw error;
    }
  }