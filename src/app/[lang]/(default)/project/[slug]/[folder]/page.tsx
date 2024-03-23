'use client';

import { useModalAction } from '@components/common/modal/modal.context';
import { Suspense } from 'react';
import { ProjectFolder } from '@components/project/project-folder-description';

export default async function Page({
  params: { lang, slug },
}: {
  params: {
    lang: string;
    slug: string;
  };
}) {
  const { openModal, closeModal } = useModalAction();

  const addFolder =(e:any)=>{
    e.preventDefault
    openModal('FOLDER_VIEW',slug);
  }

  function SearchBarFallback() {
    return <>Loading...</>;
  }

  return (
    <>

<Suspense fallback={<SearchBarFallback />}>
        <ProjectFolder lang={lang} slug={slug} />
      </Suspense>
    </>
  );
}
