import { CreatePaymentUrl, verifyPaymentUrl } from '@/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export async function handleCheckout(amount: number) {

    const customer=localStorage.getItem("user_id");
    const body = {
        amount: amount
    }
    const router=useRouter();
    var options={};
    const response = await axios.post(`${CreatePaymentUrl}`, body)
    try{
        if (response.data.success) {
            options = {
            "key": "rzp_test_3psAXU5WmuQ7qY", 
            "amount": amount*100, 
            "currency": "INR",
            "name": "Vikas Corp", 
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": response.data.data.id, 
    
            "prefill": { 
                "name": "Gaurav Kumar", 
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3389cc"
            },
            handler:async function(response:any){
                response.customer=customer 
                const res=await axios.post(`${verifyPaymentUrl}`,response);
                if(res.data.success){
                    toast.success("payment successful")
                    //address-order create hoga
                    router.replace(`/success?razorpay_payment_id=${res.data.data}`);
                }
            }
        };
        const rzpay = new (window as any).Razorpay(options);
        rzpay.open()
    }
    }
     catch (error) {
        console.error(error);
        throw error;
    }

}