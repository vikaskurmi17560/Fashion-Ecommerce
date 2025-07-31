import { CreatePaymentUrl, verifyPaymentUrl } from '@/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CartDeleteByUser } from './cartnetworks';
import { CreateOrder } from './ordernetworks';


export async function handleCheckout(amount: number, router: any, selectedAddressId: string, carts: any[]) {

  const customer = localStorage.getItem("eco_user_id");
  const body = { amount};
  try {
    const customer_id = customer;
    const customer_name = localStorage.getItem("eco_user_name") || "Customer";
    const email = localStorage.getItem("eco_user_email") || "example@example.com";
    const phone_no = localStorage.getItem("eco_phone") || "9000090000";
    const address = selectedAddressId;
    const country = "India";
    const payment_method = "Razorpay";

    const response = await axios.post(`${CreatePaymentUrl}`, body);
    if (response.data.success) {
      const options = {
        key: "rzp_test_3psAXU5WmuQ7qY",
        amount: amount * 100,
        currency: "INR",
        name: "Vikas Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: response.data.data.id,

        prefill: {
          customer_name: customer_name,
          email: email,
          contact: phone_no
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3389cc"
        },
        handler: async function (response: any) {
          response.customer = customer;
          const res = await axios.post(`${verifyPaymentUrl}`, response);
          if (res.data.success) {
            const items = carts.map((cart: any) => ({
              product_id: cart.product_id._id,
              quantity: cart.quantity,
              price: cart.total_price,
              size:cart.size
            }));

            const orderPayload = {
              customer_id,
              payment_id: res.data.data,
              customer_name,
              email,
              phone_no,
              address,
              country,
              payment_method,
              total: amount/100,
              items
            };

            await CreateOrder(orderPayload);
            await CartDeleteByUser();
            toast.success("Payment successful");
            router.replace(`/success?razorpay_payment_id=${res.data.data}`);
          }
        }
      };

      const rzpay = new (window as any).Razorpay(options);
      rzpay.open();
    }
  } catch (error) {
    console.error("Payment failed:", error);
    toast.error("Payment error");
    throw error;
  }
}
