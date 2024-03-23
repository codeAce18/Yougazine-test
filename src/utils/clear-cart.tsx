import { useCart } from "@contexts/cart/cart.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";

export async function clearCart(updateCart: any) {
  try {
    const { data } = await http.delete(API_ENDPOINTS.CART);
    updateCart();
    return data;
  }
  catch(err) {

    console.error(err);
    throw err;
  }
}
