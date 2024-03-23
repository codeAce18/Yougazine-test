import Container from '@components/ui/container';
import Breadcrumb from '@components/ui/breadcrumb';
import Divider from '@components/ui/divider';
import { AiOutlineDown, AiOutlineFolderOpen, AiOutlinePlus } from 'react-icons/ai';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react'
import cn from 'classnames';
import Button from '@components/ui/button';
import { useProjectQuery } from '@framework/project/get-project-folders';
import { Suspense } from 'react';
import { ProjectPageDescription } from '@components/project/project-description';

export default async function Page({
  params: { lang, slug },
}: {
  params: {
    lang: string;
    slug: string;
  };


}) 
{


  function SearchBarFallback() {
    return <>Loading...</>;
  }




  return (
    <>
      <Suspense fallback={<SearchBarFallback />}>
        <ProjectPageDescription lang={lang} slug={slug} />
      </Suspense>
    </>
  );
}
