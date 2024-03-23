import { useModalAction } from "@components/common/modal/modal.context";
import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

interface ContactFormValues {
    title: string;
    default: boolean;
    lat: number;
    lng: number;
    formatted_address?: string;
    first_name: string;
    last_name : string;
    country:string;
    state:string;
    city:string;
    pincode:number;
    phone:number;
    id:string
  }






async function address(values: ContactFormValues) {
    console.log( "INSIDE", values)
  try {
    const { data } = await http.put(API_ENDPOINTS.ADDRESS,{
        title:values.title,
        first_name:values.first_name,
        last_name:values.last_name,
        country:values.country,
        state:values.state,
        address:values.formatted_address,
        city:values.city,
        pincode:values.pincode,
        phone:values.phone,
        latitute:values?.lat ? values.lat :"00",
        longitude:values?.lng ? values.lng :"00",
        id:values.id

    });
    if(data){
      toast("Address edited successfully", {
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
export const useEditAressMutation = () => {
  const { closeModal, openModal } = useModalAction();
  return useMutation((input: ContactFormValues) => address(input), {
    onSuccess: (data) => {
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};



