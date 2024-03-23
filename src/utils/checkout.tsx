import { useCart } from "@contexts/cart/cart.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import getStripe from "./get-stripe";
interface CheckoutData{
  promo_code: string;
  "shipping_method":string,
  "shipping_amount": number;
  "shipping_address": string;
  "payment_method": string;
}


export async function checkoutOrder(checkoutData:CheckoutData, setOrdering: any) {
  try {
    const { data } = await http.post(API_ENDPOINTS.ORDER,checkoutData);
    const { data: payment } = await http.post(API_ENDPOINTS.STRIPE, data.data.data);
    const stripe = await getStripe();
    setOrdering(false);
    const { error } = await stripe!.redirectToCheckout({
    sessionId: payment.id,
    });
    if(error) {
      console.log(error);
      throw error;
    }
  }
  catch(err) {
    console.error(err);
    throw err;
  }
}
