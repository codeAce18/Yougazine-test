"use client";

import CategoryGridBlock from '@components/common/category-grid-block';
import Container from '@components/ui/container';
import SocialShareBox from '@components/ui/social-share-box';
import { useUI } from '@contexts/ui.context';
import { ROUTES } from '@utils/routes';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineHeart, AiOutlineNodeIndex, AiOutlinePrinter } from 'react-icons/ai';
import { BiArrowBack, BiArrowToLeft, BiReset, BiSidebar } from 'react-icons/bi';
import { BsBack } from 'react-icons/bs';
import { FaShare } from 'react-icons/fa';
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from 'react-scroll';
import { useWindowSize } from 'react-use';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPage = React.forwardRef(({ pageNumber, cover, width }: { pageNumber: number, cover: boolean, width: any }, ref: any) => {
  return (
    <div ref={ref} data-density={cover ? "hard" : ""}>
      <Page pageNumber={pageNumber} width={width} renderAnnotationLayer={false} renderTextLayer={false} />
    </div>
  );
});

export default function GetStarted({ lang, params }: { params: any, lang: any }) {
  const {name, isAuthorized} = useUI();
  const { width, height } = useWindowSize();
  return (
    <main className='bg-skin-lightfill p-5 bg-opacity-50 w-full '>
      <div className='bg-white rounded-xl min-h-[200px]'>
        <div className='flex justify-between pt-5 px-5'>
          <Link className='flex text-brand-secondary' href={`${lang}/get-started/introduction`}><BiArrowBack className="mr-1 mt-1"></BiArrowBack> <span>Back</span></Link>
          <Link className='flex text-gray-400'  href={`${lang}/get-started/introduction`}><BiReset className="mr-1 mt-1"></BiReset> <span>Restart</span></Link>
        </div>
        <div className='flex flex-col items-center pt-20'>
          <img className='w-[80px]' src={'/assets/images/process/gloria.png'} />
          <h1 className='cormorant-thin text-[40px] tracking-[87%] text-brand'>Welcome {name}</h1>
          <p className='max-w-[400px] text-center text-sm'>First, now let’s choose the category of the occasion you want to create memory for?</p>
        </div>
        <Container>
          <CategoryGridBlock className="mt-10 mb-0 lg:mb-0" lang={lang} />
        </Container>
      </div>
    </main>
  )
}