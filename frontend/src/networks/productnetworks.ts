import {PaginationURL,ProductUrl,} from "@/constants";
import axios from "axios";
export async function GetProduct(id: any) {
  try {
    const res = await axios.get(
      `${ProductUrl}?product_id=${id}`
    );
    return res.data
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Pagination(
  page: number,
  limit: number,
  category: string,
  price: number,
  search: string
) {
  try {
    const response = await axios.get(PaginationURL, {
      params: {
        page,
        quantity: limit,
        category,
        price,
        search,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}