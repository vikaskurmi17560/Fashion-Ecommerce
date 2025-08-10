import axios from "axios";
import { AddressAddUrl, AddressGetUrl, DeleteAddressUrl } from "@/constants";

export async function AddAddress(body: any) {
    try {
        const response = await axios.post(`${AddressAddUrl}`, body,{
      withCredentials: true
    });
        return response.data
    }
    catch (error) {
        throw error;
    }
}

export async function GetAddress(id: any) {
    try {
        const response = await axios.get(`${AddressGetUrl}?customer_id=${id}`,{
      withCredentials: true
    })
        return response.data
    }
    catch (error) {
        throw error;
    }
}

export async function DeleteAddress(Address_id: any) {

    try {
        const response = await axios.delete(`${DeleteAddressUrl}?Address_id=${Address_id}`,{
      withCredentials: true
    });
    }
    catch (error) {
        throw error;
    }

}