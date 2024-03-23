import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ProjectPageContent from '../../../../components/project/project-page-content';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  function SearchBarFallback() {
    return <>Loading...</>;
  }

  return (
    <>
      <PageHeroSection heroTitle="text-all-grocery-items" lang={lang} />
      <Suspense fallback={<SearchBarFallback />}>
        <ProjectPageContent lang={lang} />
      </Suspense>
    </>
  );
}
