import {
  GetProductsURL,
  ProductUrl,
  
} from "@/constants";
import axios from "axios";
export async function GetProduct(id:any){
  try{   
         const res= await axios.get(
          `${ProductUrl}?product_id=${id}`
         );
         return res.data
  }
  catch(error){
    console.error(error);
    throw error;
  }
}


export async function GetProducts(Params: any) {
  try {
    const response = await axios.get(`${GetProductsURL}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
