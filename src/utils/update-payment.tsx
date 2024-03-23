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


export async function updatePayment(orderId: string, sessionId: string) {
  try {
    const { data } = await http.put(API_ENDPOINTS.ORDER,{order_id: orderId, session_id:sessionId});
    return data;
  }
  catch(err) {
    console.error(err);
    throw err;
  }
}
