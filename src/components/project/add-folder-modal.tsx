'use client';

import { useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'src/app/i18n/client';
import { useModalAction, useModalState } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import {  useAddFolderMutation } from '@utils/project';
import { useProjectFoldersQuery } from '@framework/project/get-project-folders';

interface FolderProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}



  interface FolderFormValues{
    folderName: string;
    last:string
    secondlast:string
  }

const FolderForm: React.FC<FolderProps> = ({
  lang,
  isPopup = true,
  className,
}) => {
  const { t } = useTranslation(lang);
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FolderFormValues>();

  const { data } = useModalState();
  const {mutate:addFolder,isLoading} = useAddFolderMutation()

  function onSubmit({folderName}:any) {
    const { project_id, parent_folder } = data;
    addFolder({folderName,project_id, parent_folder})
    closeModal();
  }

  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center">
          <div className="mb-6 text-center">

            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {"ADD FOLDER"}
            </h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label={"Folder Name"}
                type="text"
                variant="solid"
                {...register('folderName', {
                  required: `${t('folder name is required')}`,
                })}
                error={errors.folderName?.message}
                lang={lang}
              />
              <div className="relative flex justify-center">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-1/2 mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                 {"Add Folder"}
                </Button>
              </div>
            </div>
          </form>

     
        </div>
      </div>
    </div>
  );
};

export default FolderForm;
