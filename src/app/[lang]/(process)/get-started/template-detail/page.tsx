import Container from '@components/ui/container';
import ProductSingleDetails from '@components/product/product';
import ElectronicProductFeed from '@components/product/feeds/electronic-product-feed';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import Breadcrumb from '@components/ui/breadcrumb';
import Divider from '@components/ui/divider';
import TemplateDetail from '@components/product/template-detail';
import { BiArrowBack, BiReset } from 'react-icons/bi';
import Link from 'next/link';

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <main className='bg-skin-lightfill p-5 bg-opacity-50 w-full '>
      <div className='bg-white rounded-xl min-h-[200px]'>
        <div className='flex justify-between pt-5 px-5'>
          <Link className='flex text-brand-secondary' href={`/${lang}/get-started/introduction`}><BiArrowBack className="mr-1 mt-1"></BiArrowBack> <span>Back</span></Link>
          <Link className='flex text-gray-400'  href={`/${lang}/get-started/introduction`}><BiReset className="mr-1 mt-1"></BiReset> <span>Restart</span></Link>
        </div>
        <div className='flex flex-col items-center pt-20'>
          <img className='w-[80px]' src={'/assets/images/process/gloria.png'} />
          <h1 className='cormorant-thin text-[40px] tracking-[87%] text-brand'>That was a nice choice  😍</h1>
          <p className='max-w-[400px] text-center text-sm'>Take a quick look at the template you selected. When you are very satisfied with your choice, you can choose to continue.</p>
        </div>
        <Container>
          <TemplateDetail lang={lang} />
        </Container>
      </div>
    </main>
  );
}
