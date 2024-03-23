import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';
import FAQ from '@components/faq/faq';

export const metadata: Metadata = {
  title: 'FAQ',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <PageHeroSection
        heroTitle="text-page-faq"
        className="faq-banner-area"
        lang={lang}
      />
      <FAQ showTitle={false} lang={lang}/>
    </>
  );
}
