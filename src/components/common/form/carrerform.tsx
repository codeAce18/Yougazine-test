'use client';

import Input from '@components/ui/input';
import { useCarrerMutation } from '@utils/carrer';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface CarrerFormProps {
  name: string;
  summary?: string;
  email?: string;
  file?: any;
}

interface Props {
  lang: string;
  t?: any;
}

export const CarrerFormPage: React.FC<Props> = ({ lang }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const { t } = useTranslation(lang);
  const{mutate:career,isLoading}= useCarrerMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarrerFormProps>();

  const onSubmit = async ({ name, email, summary }: CarrerFormProps) => {
    career({name,email,summary,selectedFile})
    console.log(name, email, summary, selectedFile);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className=" hiringform mt-5 ">
          <div className="block lg:flex justify-between">
            <div className="w-full lg:w-[48%] mb-[16px]">
              <Input
                type="text"
                variant="solid"
                placeholder="Full Name"
                style={{ border: '1px solid #CEC9C9' }}
                className="w-full h-[46px]"
                {...register('name', {
                  required: 'Name is required',
                })}
                error={errors.name?.message}
                lang={lang}
              />
            </div>
            <div className="w-full  lg:w-[48%]  mb-[16px]">
              <Input
                type="email"
                variant="solid"
                placeholder="Email"
                className="w-full h-[46px] pl-3"
                style={{ border: '1px solid #CEC9C9' }}
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
            </div>
          </div>
          <div className="mt-5 block">
            <div className="w-full  mb-[16px]">
              <textarea
                id=""
                cols={30}
                rows={10}
                placeholder="Summary"
                className="w-full pt-3 pl-3"
                style={{ border: '1px solid #CEC9C9' }}
                defaultValue={'Summary '}
                {...register('summary', {
                  required: 'forms:summary-required',
                })}
                //   error={errors.summary?.message}
                lang={lang}
              />
            </div>
            <div className="flex items-center file w-full   mb-[16px]">
              <Input
                id="formFileLg"
                type="file"
                variant="solid"
                placeholder="Select File"
                style={{ border: '1px solid #CEC9C9' }}
                {...register('file', {
                  required: 'forms:first-file-required',
                })}
                // error={errors.file?.message}
                lang={lang}
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    //   setSelectedImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                  }
                }}
              />
              <label htmlFor="formFileLg">Choose file</label>
              <p className="mx-5"> {selectedFile?.name} </p>
            </div>
            <div className="w-full  mb-[16px]">
              <button
                type="submit"
                className="rqstbtn px-[29px] py-[12px] bg-[#DA348F] text-white text-[15px] font-normal rounded-[10px]"
              >
                Submit for CV
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
