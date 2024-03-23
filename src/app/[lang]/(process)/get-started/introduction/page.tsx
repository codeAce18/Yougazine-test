"use client";

import CategoryGridBlock from '@components/common/category-grid-block';
import { useModalAction } from '@components/common/modal/modal.context';
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
  const {isAuthorized, setName ,name} = useUI();
  const { openModal } = useModalAction();

  const { width, height } = useWindowSize();

  function handleLogin() {
    openModal('LOGIN_VIEW');
}

  useEffect(() => {
    if(isAuthorized) {

    }
  }, [isAuthorized]);

  return (
    <main className='bg-skin-lightfill p-5 bg-opacity-50 w-full '>
      <div className='bg-white rounded-xl min-h-[200px]'>
        <div className='flex justify-between pt-5 px-5'>
          <button className='flex text-brand-secondary' onClick={() => { }}><BiArrowBack className="mr-1 mt-1"></BiArrowBack> <span>Back</span></button>
          <button className='flex text-gray-400' onClick={() => { }}><BiReset className="mr-1 mt-1"></BiReset> <span>Restart</span></button>
        </div>
        <>
          <div className='flex flex-col items-center pt-20'>
            <img className='w-[80px]' src={'/assets/images/process/gloria.png'} />
            <h1 className='cormorant-thin text-[40px] tracking-[87%] text-brand'>Hi, I'm Gloria</h1>
            <p className='max-w-[400px] text-center text-sm'>I'm here to help you personalized magazines for every occasion  - Celebrate, Commemorate, and Chronicle Your Unique Journey -  Type your name so we can continue</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <form className='flex flex-col max-w-[500px] justify-center pt-10 m-auto'>
              <input className='border-0 border-b border-gray-300 focus:border-0 focus:border-b focus:border-gray-500 focus:outline-none text-center cormorant-thin' type="text" placeholder='Your Name' value={name} onChange={(event) => setName(event.target.value)}></input>
              {name && <Link className='text-center mt-4 rounded-full bg-skin text-white w-[100px] mx-auto p-1.5' href={`/en/get-started/category`}>Continue</Link>}
            </form>
           <button className='bg-white shadow-md text-sm my-4 rounded-sm mx-auto px-2' onClick={() => handleLogin()}>Already have an account? <span className='text-brand'>Login</span></button>
          </div>

        </>
      </div>
    </main>
  )
}