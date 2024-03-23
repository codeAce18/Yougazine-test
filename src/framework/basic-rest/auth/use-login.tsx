import { useModalAction } from '@components/common/modal/modal.context';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me?: boolean;
}

async function login(input: LoginInputType) {
  try {
    const {data} = await http.post(API_ENDPOINTS.LOGIN, {email: input.email, password: input.password});
    if(!data.data.success) {
            toast(data.data.message, {
            progressClassName: 'danger',
            position:  'top-center' ,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      console.log('Came hEre');
      throw data;

    }
    return {
      token: data.data.data.token,
    };
  }
  catch(err) {
    console.log(err);
    throw(err);
  }

}
export const useLoginMutation = () => {
  const { authorize } = useUI();
  const { closeModal, openModal } = useModalAction();
  const { updateCart } = useCart();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      authorize();
      updateCart();
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
