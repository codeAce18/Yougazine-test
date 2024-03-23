"use client";

import Container from '@components/ui/container';
import ProductSingleDetails from '@components/product/product';
import ElectronicProductFeed from '@components/product/feeds/electronic-product-feed';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import Breadcrumb from '@components/ui/breadcrumb';
import Divider from '@components/ui/divider';
import TemplateDetail from '@components/product/template-detail';
import { BiArrowBack, BiCheck, BiReset, BiRightTopArrowCircle, BiSolidRightTopArrowCircle } from 'react-icons/bi';
import Link from 'next/link';
import { Attribute } from '@framework/types';
import { useProductQuery } from '@framework/product/get-product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import { useRouter } from 'next/navigation';

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const { data, isLoading } = useProductQuery(slug as string);
  const [select, setSelect] = useState('quality');
  const [pageSel, setPageSel] = useState();
  const [qualitySel, setQualitySel] = useState();
  const [bindingSel, setBindingSel] = useState();
  const [typeSel, setTypeSel] = useState();
  const [quantitySel, setQuantitySel] = useState();
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [priceId, setPriceId] = useState();
  const [submit, setSubmit] = useState<any>();
  const {openModal} = useModalAction();
  const {isAuthorized} = useUI();
  const { addItemToCart, isInCart, updateCart } = useCart();
  const router = useRouter();

  const type = data?.prices.map(p => p.type).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const pages = data?.prices.map(p => p.pages).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const quality = data?.prices.map(p => p.quality).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const binding = data?.prices.map(p => p.binding).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const quantity = data?.prices.map(p => p.quantity).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();


  const addToCart = async () => {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
    }
    setAddToCartLoader(true);
    await generateCartItem(data?._id, "", priceId);
    await updateCart();
    setAddToCartLoader(false);
    router.push('/en/checkout');
  }
  useEffect(() => {
    console.log(isAuthorized, submit);
    if(isAuthorized && submit == 'checkout') {
      addToCart();
      
    } else if(isAuthorized && submit == 'project') {
      console.log('take to project');
    }
  },[isAuthorized, submit]);

  useEffect(()=>{
    console.log(pageSel, qualitySel, bindingSel, typeSel, quantitySel);
    if(pageSel && qualitySel && bindingSel && typeSel && quantitySel){
      const i = data?.prices.findIndex( x => (x.type._id === typeSel && x.quantity._id === quantitySel && x.pages._id === pageSel && x.quality._id === qualitySel && x.binding._id === bindingSel))
      console.log(i);
      if(i) {
        setPriceId(data?.prices[i]._id);
      }
    } else {
      setPriceId(null);
    }
  },[pageSel, qualitySel, bindingSel, typeSel, quantitySel])

  const makePayment = () => {
    setSubmit('checkout');
    if(!isAuthorized) {
      openModal('SIGN_UP_VIEW');
    }
  }

  const createProject = () => {
    setSubmit('project');
    if(!isAuthorized) {
      openModal('SIGN_UP_VIEW');
    }
  }
  return (
    <main className='bg-skin-lightfill p-5 bg-opacity-50 w-full '>
      <div className='bg-white rounded-xl min-h-[200px]'>
        <div className='flex justify-between pt-5 px-5'>
          <Link className='flex text-brand-secondary' href={`/${lang}/get-started/template-detail?slug=${slug}`}><BiArrowBack className="mr-1 mt-1"></BiArrowBack> <span>Back</span></Link>
          <Link className='flex text-gray-400' href={`/${lang}/get-started/introduction`}><BiReset className="mr-1 mt-1"></BiReset> <span>Restart</span></Link>
        </div>
        <div className='flex flex-col items-center pt-20'>
          <img className='w-[80px]' src={'/assets/images/process/gloria.png'} />
          <h1 className='cormorant-thin text-[40px] tracking-[87%] text-brand'>{select == 'binding' ? 'Alright! One more question' : 'Great!'}</h1>
          <p className='max-w-[400px] text-center text-sm'>Now let’s choose the {select} you want for your magazine. Don’t worry, you can always change this on the summary page</p>
        </div>

        {
          select == 'quality' && (
            <div className="max-w-[400px] m-auto py-10">
              <h3 className='font-bold text-sm'>Select quality</h3>
              {
                quality && quality.map(t => (
                  <div className={`flex rounded-lg border border-gray-300 py-2 my-2 hover:border-skin cursor-pointer ${qualitySel == t._id ? 'border-skin bg-skin-fill' : ''}`} onClick={() => setQualitySel(t._id)}>
                    <span className={`relative pt-1 w-[20px] h-[20px] rounded-full shadow-inner border mx-3 ${qualitySel == t._id ? 'border-skin bg-skin' : 'border-gray-100  bg-white'}`}>{qualitySel == t._id && (<BiCheck className='absolute w-[20px] h-[20px] top-0 text-white mb-2' />)}</span>
                    <span className=''>{t.name}</span>
                  </div>
                ))
              }
              <button aria-disabled={qualitySel == null} className={`p-2 my-2 rounded-full bg-skin text-white text-[14px] ${qualitySel == null ? 'opacity-50' : ''}`} onClick={() => setSelect('pages')}>Save and continue</button>
            </div>
          )
        }

        {
          select == 'pages' && (
            <div className="max-w-[400px] m-auto py-10">
              <h3 className='font-bold text-sm'>Select number of pages</h3>
              {
                pages && pages.map(t => (
                  <div className={`flex rounded-lg border border-gray-300 py-2 my-2 hover:border-skin cursor-pointer ${pageSel == t._id ? 'border-skin bg-skin-fill' : ''}`} onClick={() => setPageSel(t._id)}>
                    <span className={`relative pt-1 w-[20px] h-[20px] rounded-full shadow-inner border mx-3 ${pageSel == t._id ? 'border-skin bg-skin' : 'border-gray-100  bg-white'}`}>{pageSel == t._id && (<BiCheck className='absolute w-[20px] h-[20px] top-0 text-white mb-2' />)}</span>
                    <span className=''>{t.value}</span>
                  </div>
                ))
              }
              <button aria-disabled={pageSel == null} className={`p-2 my-2 rounded-full bg-skin text-white text-[14px] ${pageSel == null ? 'opacity-50' : ''}`} onClick={() => setSelect('type')}>Save and continue</button>
            </div>
          )
        }

{
          select == 'type' && (
            <div className="max-w-[400px] m-auto py-10">
              <h3 className='font-bold text-sm'>Select type</h3>
              {
                type && type.map(t => (
                  <div className={`flex rounded-lg border border-gray-300 py-2 my-2 hover:border-skin cursor-pointer ${typeSel == t._id ? 'border-skin bg-skin-fill' : ''}`} onClick={() => setTypeSel(t._id)}>
                    <span className={`relative pt-1 w-[20px] h-[20px] rounded-full shadow-inner border mx-3 ${typeSel == t._id ? 'border-skin bg-skin' : 'border-gray-100  bg-white'}`}>{typeSel == t._id && (<BiCheck className='absolute w-[20px] h-[20px] top-0 text-white mb-2' />)}</span>
                    <span className=''>{t.name}</span>
                  </div>
                ))
              }
              <button aria-disabled={typeSel == null} className={`p-2 my-2 rounded-full bg-skin text-white text-[14px] ${typeSel == null ? 'opacity-50' : ''}`} onClick={() => setSelect('binding')}>Save and continue</button>
            </div>
          )
        }

{
          select == 'binding' && (
            <div className="max-w-[400px] m-auto py-10">
              <h3 className='font-bold text-sm'>Select binding</h3>
              {
                binding && binding.map(t => (
                  <div className={`flex rounded-lg border border-gray-300 py-2 my-2 hover:border-skin cursor-pointer ${bindingSel == t._id ? 'border-skin bg-skin-fill' : ''}`} onClick={() => setBindingSel(t._id)}>
                    <span className={`relative pt-1 w-[20px] h-[20px] rounded-full shadow-inner border mx-3 ${bindingSel == t._id ? 'border-skin bg-skin' : 'border-gray-100  bg-white'}`}>{bindingSel == t._id && (<BiCheck className='absolute w-[20px] h-[20px] top-0 text-white mb-2' />)}</span>
                    <span className=''>{t.name}</span>
                  </div>
                ))
              }

              <button aria-disabled={typeSel == null} className={`p-2 my-2 rounded-full bg-skin text-white text-[14px] ${typeSel == null ? 'opacity-50' : ''}`} onClick={() => setSelect('quantity')}>Save and continue</button>
            </div>
          )
        }

{
          select == 'quantity' && (
            <div className="max-w-[400px] m-auto py-10">
              <h3 className='font-bold text-sm'>Select quantity</h3>
              {
                quantity && quantity.map(t => (
                  <div className={`flex rounded-lg border border-gray-300 py-2 my-2 hover:border-skin cursor-pointer ${quantitySel == t._id ? 'border-skin bg-skin-fill' : ''}`} onClick={() => setQuantitySel(t._id)}>
                    <span className={`relative pt-1 w-[20px] h-[20px] rounded-full shadow-inner border mx-3 ${qualitySel == t._id ? 'border-skin bg-skin' : 'border-gray-100  bg-white'}`}>{quantitySel == t._id && (<BiCheck className='absolute w-[20px] h-[20px] top-0 text-white mb-2' />)}</span>
                    <span className=''>{t.value}</span>
                  </div>
                ))
              }
              <button aria-disabled={quantitySel == null} className={`block self-center p-2 px-10 my-2 mt-10 mx-auto rounded-full bg-skin text-white text-[14px] ${quantitySel == null ? 'opacity-50' : ''}`} onClick={() => makePayment()}>Make payment & pay</button>

              <button className='block flex text-skin-secondary m-auto text-xs font-bold mt-4'>Too soon to purchase? <span className='text-skin flex' onClick={() => createProject()}> Create project</span></button>

              <div className='pt-10 text-xs text-center'>“Create project” will allow you to continue designing the project and upload the content ready, to be paid later.</div>
            </div>
          )
        }

      </div>
    </main>
  );
}
