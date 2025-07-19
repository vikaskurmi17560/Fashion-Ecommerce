import { CreateOrderUrl, GetALLOrderUrl, GetOrderUrl } from "@/constants";
import axios from "axios";
import toast from "react-hot-toast";

export async function CreateOrder(body:any){
    try{
        const response= await axios.post(`${CreateOrderUrl}`,body);
    
        toast.success("Order Create successfully");
        return response.data;
    }
    catch(error){
        toast.error("Something went wrong try again !!");
        throw error;
    }

}


export async function GetOrders(){
    const id=localStorage.getItem("user_id");
    try{
        const response= await axios.get(`${GetOrderUrl}?customer_id=${id}`);
        return response.data;
    }catch(error){
        toast.error("Something went wrong here try again !!");
        throw error;
    }
}


export async function GetALLOrders(){
    const id=localStorage.getItem("user_id");
    try{
        const response= await axios.get(`${GetALLOrderUrl}?user_id=${id}`);
        return response.data;
    }catch(error){
        toast.error("Something went wrong here try again !!");
        throw error;
    }
}