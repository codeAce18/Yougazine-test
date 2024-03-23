import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface ChangePasswordInputType {
  newPassword: string;
  oldPassword: string;
}
async function changePassword(input: ChangePasswordInputType) {
  const {data}= await http.post(API_ENDPOINTS.CHANGEPASSWORD,{
    current_password:input.oldPassword,
    password:input.newPassword
  }) 

  console.log( "DATA",data.data.success, data.data.message)
  if(!data.data.success){
    toast(data.data.message, {
      progressClassName: 'danger',
      position:  'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
  else{
    toast("Password reset successfully", {
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
export const useChangePasswordMutation = () => {
  return useMutation(
    (input: ChangePasswordInputType) => changePassword(input),
    {
      onSuccess: (data) => {
 
        console.log(data, 'ChangePassword success response');
      },
      onError: (data) => {
        console.log(data, 'ChangePassword error response');
      },
    }
  );
};
