'use client';

import Container from '@components/ui/container';
import Breadcrumb from '@components/ui/breadcrumb';
import Divider from '@components/ui/divider';
import {
  AiOutlineDown,
  AiOutlineFolderOpen,
  AiOutlinePlus,
} from 'react-icons/ai';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import Button from '@components/ui/button';
import {
  useProjectFoldersQuery,
  useProjectQuery,
} from '@framework/project/get-project-folders';
import { useModalAction } from '@components/common/modal/modal.context';
import { usePathname } from 'next/navigation';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import FolderCardLoader from '@components/ui/loaders/folder-card-loader';
import { HiFolderOpen, HiOutlineFolder, HiOutlineFolderAdd } from 'react-icons/hi';


interface Props {
  lang: string;
  slug: string;
}

export const ProjectPageDescription: React.FC<Props> = ({ lang, slug }) => {


  const { openModal } = useModalAction();

  const [loading, setLoading] = useState(false);

  const { refetch, setRefetch } = useUI();

  const {
    isFetching: isLoadingFolders,
    data: folderData,
    error: folderError,
    refetch: refetchProject
  } = useProjectFoldersQuery(slug);

  useEffect(() => {
    if (refetch) {
      refetchProject();
      setRefetch(false);
    }
  }, [refetch])


  const payload = {
    project_id: slug,
    parent_folder: ''
  }

  const addFolder = (e: any) => {
    e.preventDefault;
    openModal('FOLDER_VIEW', payload);
  };

  const submitProject = (e: any) => {
    e.preventDefault;

  };



  return (
    <>
      <div className="pt-6 lg:pt-7 pb-10">
        <Container>
          <Breadcrumb lang={lang} />
          <div className="flex justify-end">
            <Button
              onClick={(e) => submitProject(e)}
              className="px-.5 rounded-full"
              disabled={false}
            >
              {'Submit Project'}
            </Button>
          </div>
          <div>
            <div className="mt-3 w-7/8 flex flex-wrap ">
              {isLoadingFolders && !folderData?.length ? (
                Array.from({ length: 10! }).map((_, idx) => (
                  <FolderCardLoader className={'m-3'} uniqueKey={`${'project'}-${idx}`} key={`project_folder-${idx}`} />
                ))
              ) : (
                folderData?.map((folder: any) => {
                  return (
                    <div className="w-3/12 p-2">
                      <div className="flex justify-center items-center bg-skin-fillsec p-3">
                        <div className="flex items-center">
                          <HiOutlineFolder className="w-1/4 text-brand-secondary text-[50px]" />
                          <Link className='w-3/4 text-brand-secondary text-[14px]'
                            href={`/${lang}${ROUTES.PROJECT}/${slug}/${folder._id}`}
                          >
                            {folder.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }))
              }

              <div className=" w-3/12 p-2">
                <div className="  flex justify-center items-center bg-skin-fillsec p-3">
                  <div
                    onClick={(e) => addFolder(e)}
                    className="cursor-pointer flex items-center"
                  >
                    <HiOutlineFolderAdd className="w-1/4 text-brand-secondary text-[50px]" />
                    <span className="w-3/4 text-brand-secondary">Add New Folder</span>
                    {/* <Link href={`/${lang}${ROUTES.PROJECT}/${slug}/folder`}>
                      Add New Folder
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
