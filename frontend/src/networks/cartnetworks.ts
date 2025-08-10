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
    const response = await axios.post(CartCreateUrl, body);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}


export async function GetCart(userId: string) {
  if (!userId) throw new Error("User ID is required");
  try {
    const response = await axios.get(`${CartGetUrl}?customer_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}


export async function CartDelete(cartId: string) {
  if (!cartId) throw new Error("Cart ID is required");
  try {
    const response = await axios.post(`${CartDeleteUrl}?cart_id=${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
}


export async function CartDeleteByUser(userId: string) {
  if (!userId) throw new Error("User ID is required");
  try {
    const response = await axios.delete(`${DeleteCartbyUSerUrl}?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting all cart items:", error);
    throw error;
  }
}


export async function CartUpdateQuantity(productId: string, userId: string, quantity: number) {
  if (!userId) throw new Error("User ID is required");
  if (!productId) throw new Error("Product ID is required");
  try {
    const res = await axios.post(
      `${CartUpdateUrl}?item_id=${productId}&user_id=${userId}`,
      { quantity }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
}

export async function ItemExists(productId: string, userId: string) {
  if (!userId) throw new Error("User ID is required");
  if (!productId) throw new Error("Product ID is required");
  try {
    const response = await axios.get(
      `${ExistsItemUrl}?product_id=${productId}&user_id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error checking item existence:", error);
    throw error;
  }
}
