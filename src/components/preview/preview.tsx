"use client";

import Container from '@components/ui/container';
import SocialShareBox from '@components/ui/social-share-box';
import { ROUTES } from '@utils/routes';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineHeart, AiOutlineNodeIndex, AiOutlinePrinter } from 'react-icons/ai';
import { BiSidebar } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from 'react-scroll';
import { useWindowSize } from 'react-use';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


// const width = 595 * 2 / 3;
// const height = 765 * 2 / 3;

const PdfPage = React.forwardRef(({ pageNumber, cover, width }: { pageNumber: number, cover: boolean, width: any }, ref: any) => {
  return (
    <div ref={ref} data-density={cover ? "hard" : ""}>
      <Page pageNumber={pageNumber} width={width} renderAnnotationLayer={false} renderTextLayer={false} loading={'Please wait'}/>
    </div>
  );
});

export default function PreviewSection({ id, pdf_file }: { id: any, pdf_file: string }) {
  const [numPages, setNumPages] = useState();
  const [template, setTemplate] = useState<any>();
  const [cover, setCover] = useState('front');
  const [currentPage, setCurrentPage] = useState(0);
  const [background, setBackground] = useState('wood');
  const [side, setSide] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const { height } = useWindowSize();
  const [scale, setScale] = useState(0.65);
  const [appliedHeight, setAppliedHeight] = useState(Math.round(height * scale));
  const [appliedWidth, setAppliedWidth] = useState(Math.round(height * 0.71 * scale));
  const [shareButtonStatus, setShareButtonStatus] = useState(false);
  const router = useRouter();
  const flipBook = useRef();
  const previewRef = useRef(null);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PREVIEW}/${id}`;

  useEffect(() => {
    setAppliedWidth(Math.round(height * 0.7 * scale));
    setAppliedHeight(appliedWidth * 1.41);
  }, [height, scale]);
  async function onDocumentLoadSuccess(pdfObject: any) {
    console.log(pdfObject);
    setNumPages(pdfObject.numPages);
  }

  const manageFlip = async (event: any) => {
    setCurrentPage(event.data);
    if (event.data == 0) {
      setCover('front');
    } else if (event.data === numPages || event.data == numPages - 1) {
      setCover('back');
    } else {
      setCover('none');
    }
  }
  return (
    <main ref={previewRef} className={'flex h-[100vh] max-h-[100vh] flex-col justify-between pb-20'}>

      <div className="flex grow overflow-hidden">
        <div className={`relative grow p-3 flex flex-col justify-center ${background == 'white' ? 'bg-white' : background == 'black' ? 'bg-black' : 'wood-bg'}`}>
          <div className={`${cover == 'front' ? `mr-[${appliedWidth}px]` : cover == 'back' ? `ml-[${appliedWidth}px]` : ''} ${cover} transition-all`}>
            {
              pdf_file && (
                <Document file={`https://d2qs6wfbkerq2c.cloudfront.net/${pdf_file}`} onLoadSuccess={onDocumentLoadSuccess} >
                  <HTMLFlipBook
                    ref={flipBook}
                    width={appliedWidth}
                    height={appliedHeight}
                    style={{ margin: 'auto' }}
                    showCover={true}
                    onFlip={manageFlip}
                    maxShadowOpacity={0.1}
                    
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <PdfPage
                        key={`page_${index + 1}`}
                        cover={index == 0 || index == numPages - 1}
                        pageNumber={index + 1}
                        width={appliedWidth}
                      />
                    ))}
                  </HTMLFlipBook>
                </Document>
              )
            }
          </div>
        </div>
      </div>


    </main>


  )
}