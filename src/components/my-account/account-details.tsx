'use client';

import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm, Controller } from 'react-hook-form';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import Switch from '@components/ui/switch';
import Text from '@components/ui/text';
import { useTranslation } from 'src/app/i18n/client';
import {  postuser, useUserQuery } from '@utils/updateuser';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AccountDetailsFrom from './account-details-form';


const AccountDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { mutate: updateUser } = useUpdateUserMutation();
  const { t } = useTranslation(lang);
  const [userData,setUserData]= useState()

  


    const {data,isLoading} =  useUserQuery()




  









  

  return (
    <div>

      

    {!isLoading && 
    <AccountDetailsFrom data={data} lang={lang} isloading={isLoading} />}

    </div>
  );
};

export default AccountDetails;
