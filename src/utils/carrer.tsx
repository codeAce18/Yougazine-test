import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface CarrerForm {
  email: any;
  name: string;
  summary: any;
  selectedFile:any;
}
async function carrer(input: CarrerForm) {

  try {
    if(!input.selectedFile){
        toast("Please select one file", {
            progressClassName: 'danger',
            position:  'top-center',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          return
    }
    const {data} = await http.post(API_ENDPOINTS.CAREER, {
        email: input.email,
         name: input.name,
         message:input.summary,
         file:input.selectedFile  });
    if(!data) {
      console.log('Came here');
      throw data;
    }
    else{
        console.log("USER CREATED")
        return data
    }
  
  }
  catch(err) {
    console.log(err);
    throw(err);
  }
}
export const useCarrerMutation = () => {
  const { authorize } = useUI();
  const { closeModal, openModal } = useModalAction();
  return useMutation((input: CarrerForm) => carrer(input), {
    onSuccess: (data) => {
      // Cookies.set('auth_token', data.token);
      console.log("SUCESS")
      toast("Form submitted successfully", {
        progressClassName: 'success',
        position:  'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'Error while submitting form');
    },
  });
};
