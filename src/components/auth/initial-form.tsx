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

interface InitialProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

export default function Initial({
  lang,
  isPopup = true,
  className,
}: InitialProps) {
  const { t } = useTranslation(lang);
  const { mutate: signUp, isLoading } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);
  const [alert,setAlert] = useState("")
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





  const onSubmit =async({ first_name,last_name,mobile, email, password,  }: SignUpInputType) => {
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





  
      const resp =  await fetch('/api/register',{
          method:"POST",
          body:JSON.stringify({first_name,last_name,mobile,email,password,role})
        })

        if(!resp) {
            throw new Error("Failed to Fetch Data");
        
          }
           else {
            const response = await resp.json();
            console.log("RESP",response)

            if(!response.success){
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
              setTimeout(()=>{
                handleSignIn()
              },3000)
            }
      
      

          }

  }
  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
     
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
        {/* {alert &&       <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={alert} />
          </div>} */}
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            src="/assets/images/login.jpg"
            alt="sign up"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">

            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-sign-up-for-free')}
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-base text-body">
              {t('common:text-already-registered')}
              <button
                type="button"
                className="text-sm ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none"
                onClick={handleSignIn}
              >
                {t('common:text-sign-in-now')}
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-5 space-x-2.5">
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaFacebook className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand " />
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaGoogle className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand" />
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaMicrosoft className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand" />
            </button>
          </div>
          <div className="relative flex flex-col items-center justify-center text-sm">
            <span className="mb-6 mt-6 text-sm text-brand-dark opacity-70">
              {t('common:text-or')}
            </span>
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
                error={errors.password?.message}
                {...register('password', {
                  required: `${t('forms:password-required')}`,
                })}
                lang={lang}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>

                  <label
                    onClick={() => setRemember(!remember)}
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    {t('forms:label-remember-me')}
                  </label>
                </div>
                <div
                  className="flex ltr:ml-auto rtl:mr-auto mt-[2px]"
                  onClick={closeModal}
                >
                  <Link
                    href={`/${lang}${ROUTES.PRIVACY}`}
                    legacyBehavior
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    <a target="_blank">{t('common:text-privacy-and-policy')}</a>
                  </Link>
                </div>
              </div>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
