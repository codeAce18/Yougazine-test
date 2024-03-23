import { useCart } from "@contexts/cart/cart.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { QueryOptionsType, Product } from '@framework/types';
import { useQuery } from 'react-query';
import { toast } from "react-toastify";


export async function postuser(input:any,bodyValues:any) {
  try {
    const { data } = await http.put(API_ENDPOINTS.UPDATEUSER,{
        email:bodyValues.email,
        first_name:input.firstName,
        last_name:input.lastName,
        mobile:input.phoneNumber,
        role:bodyValues.role,
        id:bodyValues.id
    });

    if(data){
      toast( "Details submitted successfully", {
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



export const fetchUserQuery = async () => {
//   const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.UPDATEUSER);
  return data.data;
};
export const useUserQuery = () => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.UPDATEUSER],
    fetchUserQuery
  );
};




