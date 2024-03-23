import { useCart } from "@contexts/cart/cart.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";

export async function deleteFromCart(id:number) {
  try {
    const { data } = await http.post(API_ENDPOINTS.DELETEITEM,{id:id});
    return data;
  }
  catch(err) {
    console.error(err);
    throw err;
  }
}
