import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";

export async function deleteCartItem(cartId: string) {
  try {
    const { data } = await http.delete(`${API_ENDPOINTS.CART}?id=${cartId}`);
    return data;
  }
  catch(err) {

    console.error(err);
    throw err;
  }
}
