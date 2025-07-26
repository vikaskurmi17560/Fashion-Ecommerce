import {
  CartCreateUrl,
  CartDeleteUrl,
  CartGetUrl,
  CartUpdateUrl,
  DeleteCartbyUSerUrl,
  ExistsItemUrl,
} from "@/constants";
import axios from "axios";

export async function AddToCart(body: any) {
  try {
    const response = await axios.post(`${CartCreateUrl}`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function GetCart() {
  try {
    const id = localStorage.getItem("eco_user_id");
    const response = await axios.get(`${CartGetUrl}?customer_id=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}


export async function CartDelete(params: any) {
  try {
    const response = await axios.post(`${CartDeleteUrl}?cart_id=${params.cart_id}`);
    return response.data;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}
export async function CartDeleteByUser() {
  try {
    const user_id = localStorage.getItem("eco_user_id");

    if (!user_id) throw new Error("User not logged in");

    const response = await axios.delete(`${DeleteCartbyUSerUrl}?user_id=${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Cart deletion error:", error);
    throw error;
  }
}

export async function CartUpdateQuantity(productId: string, quantity:number) {
  try {
    const user_id = localStorage.getItem("eco_user_id");
    const res = await axios.post(
      `${CartUpdateUrl}?item_id=${productId}&user_id=${user_id}`,
      { quantity }  
    );
    return res.data;
  } catch (err) {
    console.error("CartUpdateQuantity API error:", err);
    return;
  }
}


export async function ItemExists(productId: any) {
  try {
    const user_id = localStorage.getItem("eco_user_id");

    if (!user_id) throw new Error("User not logged in");

    const response = await axios.get(`${ExistsItemUrl}?product_id=${productId}&user_id=${user_id}`);
    return response.data;
  } catch (error) {
    console.error("ItemExists error:", error);
    throw error;
  }
}
