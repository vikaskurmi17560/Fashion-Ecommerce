import { CreatePaymentUrl, verifyPaymentUrl } from "@/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { CartDeleteByUser } from "./cartnetworks";
import { CreateOrder } from "./ordernetworks";
import { getUser } from "./customernetworks";

interface User {
  _id: string;
  name?: string;
  email?: string;
  phone_no?: string;
}

export async function handleCheckout(
  amount: number,      
  router: any,
  selectedAddressId: string,
  carts: any[],
  user: User | null
) {
  if (!user || !user._id) {
    toast.error("User not logged in");
    return;
  }

  const customer_id = user._id;

  try {
   
    const customerResponse = await getUser(customer_id);

    const customer_name = customerResponse?.name || "Customer";
    const email = customerResponse?.email || "example@example.com";
    const phone_no = customerResponse?.phone_no || "9000090000";

    const address = selectedAddressId;
    const country = "India";
    const payment_method = "Razorpay";
    const response = await axios.post(CreatePaymentUrl, {amount});

    if (response.data.success) {
      const options = {
        key: process.env.NEXT_PUBLIC_TEST_API_KEY,
        amount: amount,          
        currency: "INR",
        name: "Vikas Corp",
        description: "Test Transaction",
        order_id: response.data.data.id,

        prefill: {
          name: customer_name,
          email,
          contact: phone_no,
        },

        notes: {
          address: "Razorpay Corporate Office",
        },

        theme: {
          color: "#3389cc",
        },

        handler: async function (razorpayResponse: any) {
          try {
            const verifyPayload = {
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
              customer: customer_id,
            };

            const verifyRes = await axios.post(verifyPaymentUrl, verifyPayload);

            if (verifyRes.data.success) {
              const items = carts.map((cart: any) => ({
                product_id: cart.product_id._id,
                quantity: cart.quantity,
                price: cart.total_price,
                size: cart.size,
              }));

              const orderPayload = {
                customer_id,
                payment_id: verifyRes.data.data,
                customer_name,
                email,
                phone_no,
                address,
                country,
                payment_method,
                total: amount,
                items,
              };

              await CreateOrder(orderPayload);
              await CartDeleteByUser(customer_id);
              toast.success("Payment successful");
              router.replace(`/success?razorpay_payment_id=${verifyRes.data.data}`);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment handler error:", error);
            toast.error("Payment verification error");
          }
        },
      };

      const rzpay = new (window as any).Razorpay(options);
      rzpay.open();
    } else {
      toast.error("Failed to initiate payment");
    }
  } catch (error) {
    console.error("Payment failed:", error);
    toast.error("Payment error");
  }
}
