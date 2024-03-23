'use client';

import Container from '@components/ui/container';
import Breadcrumb from '@components/ui/breadcrumb';
import { AiFillFile, AiFillFilePdf, AiFillFileWord, AiOutlineDown, AiOutlineFolderOpen, AiOutlinePlus } from 'react-icons/ai';

import Button from '@components/ui/button';
import { useModalAction } from '@components/common/modal/modal.context';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@utils/routes';
import { useSubmitFolderMutation } from '@utils/project';
import { useProjectFilesQuery } from '@framework/project/get-project-folders';
import { useEffect } from 'react';
import { useUI } from '@contexts/ui.context';
import SectionHeader from '@components/common/section-header';
import Image from 'next/image';
import externaImageLoader from '@utils/external-image-loader';
import { HiOutlineFolder, HiOutlineFolderAdd } from 'react-icons/hi';

interface Props {
  lang: string;
  slug: string
}

interface Slug {
  last: any;
  secondlast: any
}

export const ProjectFolder: React.FC<Props> = ({ lang, slug }) => {
  const pathname = useParams();
  const { openModal, closeModal } = useModalAction();
  const { refetch, setRefetch } = useUI();
  const { mutate: submitFolder, isLoading } = useSubmitFolderMutation()
  const { folder } = pathname;

  let payload = {
    project_id: slug,
    parent_folder: folder
  }

  const {
    isFetching,
    data: projectData,
    error,
    refetch: refetchFolder
  } = useProjectFilesQuery(folder);

  useEffect(() => {
    if (refetch) {
      refetchFolder();
      setRefetch(false);
    }
  }, [refetch])

  const addFolder = (e: any) => {
    e.preventDefault
    openModal('FOLDER_VIEW', payload);
  }

  const addFiles = (e: any) => {
    e.preventDefault
    openModal('ADD_FILES_VIEW', slug);
  }

  const handleSubmitFolder = (e: any) => {
    e.preventDefault
    submitFolder({ slug })
  }
  console.log(projectData);
  return (
    <>
      <div className="pt-6 lg:pt-7 pb-10">
        <Container>
          <Breadcrumb lang={lang} />
          <div>
            <div className="mt-4 mb-3 md:mb-5">
              <SectionHeader
                sectionHeading={'Sub Folders'}
                className={'mb-3'}
                lang={lang}
              />
            </div>
            <div className="flex flex-wrap">
              {projectData?.subfolders?.map((folder: any) => {
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
              })}
              <div className=" w-3/12 p-2">
                <div className="  flex justify-center items-center bg-skin-fillsec p-3">
                  <div onClick={(e) => addFolder(e)} className="cursor-pointer flex items-center">
                  <HiOutlineFolderAdd className="w-1/4 text-brand-secondary text-[50px]" />
                    <span className="w-3/4 text-brand-secondary">Add New Folder</span>
                    {/* <Link href={`/${lang}${ROUTES.PROJECT}/${slug}/folder`}>
                      Add New Folder
                    </Link> */}
                  </div>
                </div>
              </div>


            </div>

            <div className="mt-4 mb-3 md:mb-5">
              <SectionHeader
                sectionHeading={'Files'}
                className={'mb-3'}
                lang={lang}
              />
            </div>
            <div className="flex flex-wrap ">
              {
                projectData?.files?.map((file: any) => {
                  let name = file.image.split('/');
                  name = name[name.length - 1];
                  let extn = file.image.split('.');
                  extn = extn[extn.length - 1];
                  return (
                    <div className="w-3/12 p-2">
                      <div className="bg-skin-lightfill rounded-lg p-1">
                        <div className="w-full h-[200px] flex align-middle bg-white">
                          {(extn == 'png'||extn == 'jpeg' ||extn == 'jpg') ? (
                            <Image loader={externaImageLoader} width={500} height={200} src={file.image} alt={name} />
                          ) : (extn == 'doc' || extn == 'docx') ? (
                            <AiFillFileWord className='text-6xl m-auto' />
                          ) : extn == 'pdf' ? (
                            <AiFillFilePdf className='text-6xl m-auto' />)
                             : (<AiFillFile className='text-6xl m-auto' />)
                          }
                        </div>
                        <div className="baristercnt d-flex justify-content-between align-items-center pe-2 pt-2">
                          <a href="#">{name}</a> <a href="#"><i className="fa-solid fa-ellipsis-vertical" /></a>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

              <div className="w-3/12 p-2">
                <div className="bg-skin-lightfill rounded-lg p-1">
                  <div onClick={(e) => addFiles(e)} className="cursor-pointer flex items-center justify-center w-full h-[200px] flex align-middle bg-white">
                    <AiOutlinePlus className="text-brand-secondary text-[100px]"></AiOutlinePlus>
                  </div>
                  <div className="baristercnt d-flex justify-content-between align-items-center pe-2 pt-2">
                    <a href="#">Add new file</a> <a href="#"><i className="fa-solid fa-ellipsis-vertical" /></a>
                  </div>
                </div>
              </div>




            </div>

            <div className='absolute right-5 top-5'>
              <Button
                onClick={(e) => handleSubmitFolder(e)}
                className="px-.5"
                disabled={false}
              >
                {"Submit Folder"}
              </Button>
            </div>
          </div>

        </Container>
      </div>
    </>
  );
}
