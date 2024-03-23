import { useCart } from "@contexts/cart/cart.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { template } from "lodash";
import { toast } from "react-toastify";

export async function wishlist(id:any) {
  try {
    const { data } = await http.post(API_ENDPOINTS.WISHLIST,{template_id:id});
    return data;
  }
  catch(err) {

    console.error(err);
    throw err;
  }
}

export async function deletewishlist(id:any) {
  try {
    const { data } = await http.delete(`${API_ENDPOINTS.WISHLIST}?id=${id}`);
    if(data){
      toast("Item removed from wishlist", {
        progressClassName: 'danger',
        position:  'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    return data;
  }
  catch(err) {

    console.error(err);
    throw err;
  }
}


export async function getwishlist() {
    try {
      const { data } = await http.get(API_ENDPOINTS.WISHLIST);
      return data;
    }
    catch(err) {
      console.error(err);
      throw err;
    }
  }



