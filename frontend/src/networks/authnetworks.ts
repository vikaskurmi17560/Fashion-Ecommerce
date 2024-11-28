import {
  CartCreateUrl,
  CartDeleteUrl,
  CartGetUrl,
  ForgotUrl,
  GetProductsURL,
  LoginUrl,
  ProductUrl,
  ResetUrl,
  signUpUrl,
} from "@/constants";
import axios from "axios";
//-----------------------------------customer network----------------------------------------------------------------------------------------------
export async function SignUp(formdata: any) {
  try {
    const response = await axios.post(signUpUrl, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function LogIn(formdata: any) {
  try {
    const response = await axios.post(LoginUrl, formdata);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Forgot(formdata: any) {
  try {
    const response = await axios.post(ForgotUrl, formdata);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Reset(formdata: any) {
  try {
    const response = await axios.post(
      `${ResetUrl}?token=${formdata.token}`,
      formdata
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function GetProduct(id:any){
  try{   
         const res= await axios.get(
          `${ProductUrl}?product_id=${id}`
         );
         console.log("kya yar",res);
         return res.data
  }
  catch(error){
    console.error(error);
    throw error;
  }
}

//---------------------------------------------Product Network-----------------------------------------------------------------------------------
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
//--------------------------------------------Add Product Into Cart-----------------------------------------------------------------------------------------

export async function AddToCart(body: any) {
  try {
    const response = await axios.post(`${CartCreateUrl}`,body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//----------------------------------------cart get-------------------------------------------------------------------------------------------------

export async function GetCart(Params:any){
  try{
    const response= await axios .get(`${CartGetUrl}?customer_id=6740a7f94e07c8eb0e197b6b`);
    return response.data;
  }catch(error){
    console.error(error);
    throw error;
  }

}
// --------------------------------cart Delete ---------------------------------------------------------------------------------------------------

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