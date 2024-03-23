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

export default function Preview({ params }: { params: any }) {
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
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PREVIEW}/${params.id}`;

  useEffect(() => {
    setAppliedWidth(Math.round(height * 0.7 * scale));
    setAppliedHeight(appliedWidth * 1.41);
  }, [height, scale]);
  useEffect(() => {
    fetch(`/api/template?slug=${params.id}`, {
      method: 'GET',
    }).then(tRes => {
      tRes.json().then((tResponse) => {
        setTemplate(tResponse.data[0]);
      })
    });
  }, []);
  async function onDocumentLoadSuccess(pdfObject: any) {
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

  const changePage = async (newPage: any) => {
    flipBook?.current?.pageFlip().flip(newPage, ["bottom"]);
    setCurrentPage(newPage);
  }

  const enterFullscreen = () => {
    const elem = previewRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    }
    setFullScreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    }
    setFullScreen(false);
  };
  return (
    <main ref={previewRef} className={'flex h-[100vh] max-h-[100vh] flex-col justify-between'}>
      <div className={'bg-preview-base flex w-full text-white'}>
        <Container className={'w-full flex justify-between py-3'}>
          <Button onClick={() => { setSide(!side) }}>
            <BiSidebar className={'text-xl'}></BiSidebar>
          </Button>
          <p>{template?.name}</p>
          <Button onClick={() => router.push('/')}>
            Close
          </Button>
        </Container>
      </div>

      <div className="flex grow overflow-hidden">
        <div className={`flex flex-col overflow-scroll w-2/12 max-w-[100%] ${side ? 'block' : 'hidden'}`}>
          {
            template?.pdf_file && (
              <Document file={`https://d2qs6wfbkerq2c.cloudfront.net/${template?.pdf_file}`} onLoadSuccess={onDocumentLoadSuccess} >
                {Array.from(new Array(numPages), (el, index) => (
                  <div onClick={() => { changePage(index) }} className='preview-sidebar p-5 m-auto'>
                    <Page pageNumber={index + 1} width={100} renderAnnotationLayer={false} renderTextLayer={false} />
                    <span className={'text-center w-full block'}>{index + 1}</span>
                  </div>

                ))}
              </Document>
            )
          }
        </div>
        <div className={`relative grow p-3 flex flex-col justify-center ${background == 'white' ? 'bg-white' : background == 'black' ? 'bg-black' : 'wood-bg'}`}>
          <div className={`${cover == 'front' ? `mr-[${appliedWidth}px]` : cover == 'back' ? `ml-[${appliedWidth}px]` : ''} ${cover} transition-all`}>
            {
              template?.pdf_file && (
                <Document file={`https://d2qs6wfbkerq2c.cloudfront.net/${template?.pdf_file}`} onLoadSuccess={onDocumentLoadSuccess} >
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
          <div className={'absolute bottom-0 pb-5 left-0 px-3 w-full flex align-center justify-between'}>
            <div className={'w-4/6 flex'}>
              <span className='text-white w-[120px]'>{`Page ${currentPage + 1} of ${numPages}`}</span>
              <input onChange={(event: any) => changePage(event.target.value - 1)} type="range" min="1" max={numPages} value={currentPage + 1} className="w-full h-2 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            </div>
            {/* <div className={'w-2/6 px-12 flex justify-center'}>
              <span className='text-white'>+&nbsp;</span>
              <input onChange={(event: any) => setScale(event.target.value)} step="0.01" type="range" min="1" max="1.4" value={scale} className="w-full h-2 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <span className='text-white'>&nbsp;-</span>
            </div> */}
            <Button onClick={() => { !fullScreen ? enterFullscreen() : exitFullscreen() }}>
              {!fullScreen ?
                (<AiOutlineFullscreen className={'text-xl text-white'} />) :
                (<AiOutlineFullscreenExit className={'text-xl text-white'} />)}
            </Button>
            
          </div>
        </div>
      </div>
      <div className={'bg-preview-base flex w-full'}>
        <Container className={'w-full flex justify-between py-3'}>
          <div className={'w-3/6 flex justify-between'}>
            <Button className='flex' onClick={() => { setShareButtonStatus(!shareButtonStatus)}}>
              <FaShare className={'text-white text-xl'}></FaShare><span className='text-white'>&nbsp;Share</span>
            </Button>
            <SocialShareBox
                  className={`absolute z-10 bottom-12 align-bottom ltr:left-0 rtl:right-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${shareButtonStatus === true
                    ? 'visible opacity-100'
                    : 'opacity-0 invisible'
                    }`}
                  shareUrl={productUrl}
                  lang={params.lang}
                />
            <Button className='flex' onClick={() => { }}>
              <AiOutlineHeart className={'text-white text-xl'}></AiOutlineHeart><span className='text-white'>&nbsp;Love</span>
            </Button>
            <a href={template?.pdf_file ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${template.pdf_file}` : ''} download={true} className='flex' onClick={() => { }}>
              <AiOutlineDownload className={'text-white text-xl'}></AiOutlineDownload><span className='text-white'>&nbsp;Download</span>
            </a>
            <Link href={`/en/print?file=${template?.pdf_file || ''}`} target="_blank" className='flex' onClick={() => { }}>
              <AiOutlinePrinter className={'text-white text-xl'}></AiOutlinePrinter><span className='text-white'>&nbsp;Print</span>
            </Link>
          </div>
          <div className='flex'>
            <p className='text-white'>Change Background</p>
            <Button onClick={() => setBackground('black')} className={`w-[20px] h-[20px] mx-2 bg-black border-solid rounded-sm border-2 ${background == 'black' ? 'border-skin-primary' : 'border-gray-100'}`}></Button>
            <Button onClick={() => setBackground('wood')} className={`w-[20px] h-[20px] mx-2 wood-bg border-solid rounded-sm border-2 ${background == 'wood' ? 'border-skin-primary' : 'border-gray-100'}`}></Button>
            <Button onClick={() => setBackground('white')} className={`w-[20px] h-[20px] mx-2 bg-white border-solid rounded-sm border-2 ${background == 'white' ? 'border-skin-primary' : 'border-gray-100'}`}></Button>
          </div>
        </Container>
      </div>


    </main>


  )
}