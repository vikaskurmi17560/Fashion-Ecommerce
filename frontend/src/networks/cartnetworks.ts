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
      const id= localStorage.getItem("user_id");
      const response= await axios .get(`${CartGetUrl}?customer_id=${id}`);
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