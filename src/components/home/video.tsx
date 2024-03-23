'use client';

import { useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useLoginMutation, LoginInputType } from '@framework/auth/use-login';
import Logo from '@components/ui/logo';
import { useTranslation } from 'src/app/i18n/client';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import cn from 'classnames';
import { useCart } from '@contexts/cart/cart.context';
import BannerVideo from '@components/hero/banner-video';

interface VideoProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

const Video: React.FC<VideoProps> = ({
  lang,
  isPopup = true,
  className,
}) => {
  const { t } = useTranslation(lang);
  const { closeModal, openModal } = useModalAction();
  const { mutate: login, isLoading } = useLoginMutation();
  
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ email, password, remember_me }: LoginInputType) {
    login({
      email,
      password,
      remember_me,
    });

    // if(loginREsp!==null){
    //   closeModal();
    // } 
  }
  function handelSocialLogin() {
    login({
      email: 'demo@demo.com',
      password: 'demo',
      remember_me: true,
    });
    closeModal();
  }
  function handleSignUp() {
    return openModal('SIGN_UP_VIEW');
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }
  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <BannerVideo />
    </div>
  );
};

export default Video;
