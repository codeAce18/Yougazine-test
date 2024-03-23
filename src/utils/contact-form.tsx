import { useCart } from "@contexts/cart/cart.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { toast } from "react-toastify";


interface ContactFormValues {
    name: string;
    email: string;
    phone: string;
    message: string;
  }


export async function submitContact(values:ContactFormValues) {
  try {
    const { data } = await http.post(API_ENDPOINTS.CONTACTUS,{
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message

    });
    if(!data.data){
      toast("Something went wrong, please try again", {
        progressClassName: 'danger',
        position:  'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    else{
      toast(data.data.message, {
        progressClassName: 'success',
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
