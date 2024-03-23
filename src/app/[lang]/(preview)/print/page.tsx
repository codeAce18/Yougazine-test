"use client";

import Container from '@components/ui/container';
import SocialShareBox from '@components/ui/social-share-box';
import { ROUTES } from '@utils/routes';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineHeart, AiOutlineNodeIndex, AiOutlinePrinter } from 'react-icons/ai';
import { BiSidebar } from 'react-icons/bi';
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

export default function Preview({ params }: { params: any }) {
  const [numPages, setNumPages] = useState();
  const { width, height } = useWindowSize();
  const searchParams = useSearchParams();
  const file = searchParams?.get('file');
  const previewRef = useRef(null);
  async function onDocumentLoadSuccess(pdfObject: any) {
    setNumPages(pdfObject.numPages);
    setTimeout(() => {
      window.print();
    }, 7000);
  }
  return (
    <main ref={previewRef} className={'relative flex h-[100vh] max-h-[100vh] flex-col justify-between'}>
      {
        file && (
          <Document file={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${file}`} onLoadSuccess={onDocumentLoadSuccess} >
            {Array.from(new Array(numPages), (el, index) => (
              <Page pageNumber={index + 1} width={width} renderAnnotationLayer={false} renderTextLayer={false} />

            ))}
          </Document>
        )
      }


    </main>


  )
}