import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";

export async function generateCartItem(templateId: string, projectId: string, priceId: string) {
  try {
    console.log(templateId, priceId);
    const { data } = await http.post(API_ENDPOINTS.CART, {template_id: templateId, project_id: projectId, price_id: priceId});
    return data.data;
  }
  catch(err) {
    console.error(err);
    throw err;
  }
}
