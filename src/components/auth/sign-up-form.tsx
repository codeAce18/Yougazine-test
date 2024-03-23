'use client';

import { useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { useSignUpMutation, SignUpInputType } from '@framework/auth/use-signup';
import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import Alert from '@components/ui/alert';
import { toast } from 'react-toastify';
import { useWindowSize } from 'react-use';
import { FaFacebook, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { useUI } from '@contexts/ui.context';

interface SignUpFormProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

export default function SignUpForm({
  lang,
  isPopup = true,
  className,
}: SignUpFormProps) {
  const { t } = useTranslation(lang);
  const { mutate: signUp, isLoading } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);
  const [alert, setAlert] = useState("");
  const {name} = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();
  const { width } = useWindowSize();



  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }

  function handelSocialLogin() {

    closeModal();
  }





  const onSubmit = async ({ first_name, last_name, mobile, email, password, }: SignUpInputType) => {
    const role = '6556ff6641ea3f14900e5a3e'

    // signUp({
    //   email,
    //   password,
    //   first_name,
    //   mobile,
    //   last_name,
    //   role
    // });

    // const respSignup = await fetch ('api/register',{
    //     method:"POST",
    //     body:JSON.stringify({email,password,first_name,last_name,mobile,role})
    // })

    // if(respSignup){
    //   console.log("RESP SIGNUP")
    //   console.log(respSignup.data)
    // }






    const resp = await fetch('/api/register', {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, mobile, email, password, role })
    })

    if (!resp) {
      throw new Error("Failed to Fetch Data");

    }
    else {
      const response = await resp.json();
      console.log("RESP", response)

      if (!response.success) {
        // alert(response.message)
        toast(response.message, {
          progressClassName: 'danger',
          position: width! > 768 ? 'top-center' : 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setAlert(response.message)
        return
      } else {
        toast("User Added Successfully, Redirecting to login page", {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'top-center' : 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          handleSignIn()
        }, 3000)
      }



    }

  }
  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg max-w-[500px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
        {/* {alert &&       <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={alert} />
          </div>} */}
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className='flex flex-col items-center pt-10 pb-10'>
            <img className='w-[80px]' src={'/assets/images/process/gloria.png'} />
            <h1 className='cormorant-thin text-[40px] tracking-[87%] text-brand'>Lets create an account</h1>
            <p className='max-w-[400px] text-center text-sm'>You need to create an account to see your summary</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label={"First Name"}
                type="text"
                value={name}
                placeholder='Enter your first name'
                variant="solid"
                {...register('first_name', {
                  required: 'forms:first-name-required',
                })}
                error={errors.first_name?.message}
                lang={lang}
              />
              <Input
                label={"Last Name"}
                type="text"
                placeholder='Enter your last name'
                variant="solid"
                {...register('last_name', {
                  required: 'forms:last-name-required',
                })}
                error={errors.last_name?.message}
                lang={lang}
              />
              <Input
                label={"Phone Number"}
                type="number"
                placeholder='Enter your phone number'
                variant="solid"
                {...register('mobile', {
                  required: 'forms:mobile-required',
                })}
                error={errors.mobile?.message}
                lang={lang}
              />
              <Input
                label={t('forms:label-email') as string}
                type="email"
                placeholder='Enter your email'
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
              <PasswordInput
                label={t('forms:label-password')}
                placeholder='Enter your password'
                error={errors.password?.message}
                {...register('password', {
                  required: `${t('forms:password-required')}`,
                })}
                lang={lang}
              />
              
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('common:text-register')}
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <div
                  className="ltr:ml-auto rtl:mr-auto mt-[2px] text-xs text-center"
                  onClick={closeModal}
                >
                  By placing your order, you agree to be bound by the Yougazine&nbsp;<Link
                    href={`/${lang}${ROUTES.PRIVACY}`}
                    legacyBehavior
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    <a target="_blank">{t('common:text-privacy-and-policy')}</a>
                  </Link>. Your credit/debit card data will not saved.
                  
                </div>
              </div>
            </div>
          </form>
          <div className="mt-3 mb-1 text-xs text-center sm:text-base text-body text-brand-secondary text-bold">
            {t('common:text-already-registered')}
            <button
              type="button"
              className="text-sm ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none "
              onClick={handleSignIn}
            >
              {t('common:text-sign-in-now')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
