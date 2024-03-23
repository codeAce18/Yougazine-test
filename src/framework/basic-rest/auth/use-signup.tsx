import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface SignUpInputType {
  email: string;
  password: string;
  first_name: string;
  mobile: number;
  last_name: string;
  role:string;
}
async function signUp(input: SignUpInputType) {

  try {
    const {data} = await http.post(API_ENDPOINTS.REGISTER, {email: input.email, password: input.password,first_name:input.first_name,last_name:input.last_name , mobile:input.mobile ,role:input.role });
    if(!data) {
      console.log('Came hEre');
      throw data;
    }
    else{
        console.log("USER CREATED")
    }
  
  }
  catch(err) {
    console.log(err);
    throw(err);
  }
  return {
    token: `${input.email}.${input.first_name}`.split('').reverse().join(''),
  };
}
export const useSignUpMutation = () => {
  const { authorize } = useUI();
  const { closeModal, openModal } = useModalAction();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      // Cookies.set('auth_token', data.token);
      console.log("SUCESS")
      toast("User created successfully, please activate your account via mail", {
        progressClassName: 'danger',
        position:  'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // authorize();
      // modalClose()
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
