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
import Link from 'next/link';

interface LoginFormProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  lang,
  isPopup = true,
  className,
}) => {
  const { t } = useTranslation(lang);
  const { closeModal, openModal } = useModalAction();
  const { mutate: login, isLoading } = useLoginMutation();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ email, password }: LoginInputType) {
    login({
      email,
      password,
    });

    // if(loginREsp!==null){
    //   closeModal();
    // } 
  }
  function handelSocialLogin() {
    login({
      email: 'demo@demo.com',
      password: 'demo',
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
    <div className={cn(
      'flex bg-brand-light mx-auto rounded-lg max-w-[500px]',
      className
    )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
    <div
      className={cn(
        'w-full md:w-[600px] lg:w-[500px] xl:w-[500px] 2xl:w-[500px] relative bg-white p-10 ',
        className
      )}
    >
      <div className='flex flex-col items-center pt-10'>
            <img className='w-[80px]' src={'/assets/images/process/gloria.png'} />
            <h1 className='cormorant-thin text-[7vw] md:text-[35px] tracking-[87%] text-brand mt-5px'>You have to sign in first</h1>
            <p className='max-w-[300px] text-center text-lg'>You need to create an account to see your summary</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5 mt-6">
              <Input
                label={t('forms:label-name') as string}
                type="email"
                variant="solid"
                {...register('email', {
                  required: `${t('forms:email-required')}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t('forms:email-error'),
                  },
                })}
                error={errors.email?.message}
                lang={lang}
              />
              <div className='mt-5'>
              <PasswordInput
                label={t('forms:label-password') as string}
                error={errors.password?.message}
                {...register('password', {
                  required: `${t('forms:password-required')}`,
                })}
                lang={lang}
              />
              </div>
               <div className="border-r-10">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark border-r-8"
                  >
                    {t('common:text-forgot-password')}
                  </button>
                </div>
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  { t('common:text-sign-in-now')}
                </Button>
            </div>
          </form>
          <div className="mt-3 mb-1 text-xs text-center sm:text-base text-body text-brand-secondary text-bold">
            {t('common:text-don’t-have-account')}
            <button
              type="button"
              className="text-sm  sm:text-base text-brand hover:no-underline focus:outline-none "
              onClick={handleSignUp}
            >
              {  t('common:text-create-account')}
            </button>
          </div>
        </div>
        </div>
  );
};

export default LoginForm;
