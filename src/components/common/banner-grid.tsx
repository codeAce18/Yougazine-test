"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { useModalAction } from './modal/modal.context';
import { useSpring, animated } from 'react-spring';

interface BannerProps {
  data: any;
  grid?: number;
  className?: string;
  girdClassName?: string;
  lang: string;
}

const BannerGrid: React.FC<BannerProps> = ({
  data,
  grid = 3,
  girdClassName,
  className = 'mb-3 xl:mb-6',
  lang,
}) => {
  const { openModal } = useModalAction();
  const [showPopup, setShowPopup] = useState(false);

  const popupAnimation = useSpring({
    transform: showPopup ? 'translateY(0%)' : 'translateY(100%)',
    opacity: showPopup ? 1 : 0,
  });

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={className}>
      <h2 className="heading-with-line text-[40px] cormorant-thin text-black text-center mt-32 relative"><span className='relative px-8 bg-white'>Get Started</span></h2>
      <div className='flex flex-wrap justify-center pt-[50px] pb-[130px]'>
        <div className="group m-4 bg-white w-full max-w-[350px] border border-gray-100 relative hover:border-skin">
          <Image
            src={'/assets/images/home/cover1.jpg'}
            alt={'Product Image'}
            quality={100}
            width={0}
            height={0}
            sizes="100%"
            priority
            className="w-full h-auto object-cover bg-fill-thumbnail grayscale group-hover:grayscale-0"
          />
          <div className="absolute bg-white mt-[-225px] transition-all group-hover:border-skin group-hover:mt-0 group-hover:min-h-[100px] group-hover:bg-skin-lightfill group-hover:bg-opacity-50 min-h-[225px] p-5 pt-10 z-50 border border-gray-100 border-t-0 flex flex-col justify-end">
            <h3 className='text-lg font-bold'>Done for you</h3>
            <p>Quickly add any graph or text block. Drag-and-drop to layout.</p>
          </div>
        </div>
        <div className="group m-4 border border-gray-100 bg-white w-full max-w-[350px] relative hover:border-skin">
          <div>
            <Image
              src={'/assets/images/home/cover2.jpg'}
              alt={'Product Image'}
              quality={100}
              width={0}
              height={0}
              sizes="100%"
              priority
              className="w-full h-auto object-cover bg-fill-thumbnail grayscale group-hover:grayscale-0"
            />
          </div>
          <div className="absolute bg-white mt-[-225px] transition-all group-hover:border-skin group-hover:mt-0 group-hover:min-h-[100px] group-hover:bg-skin-lightfill group-hover:bg-opacity-50 min-h-[225px] p-5 pt-10 z-50 border border-gray-100 border-t-0 flex flex-col justify-end">
            <h3 className='text-lg font-bold'>Start designing</h3>
            <p>Quickly add any graph or text block. Drag-and-drop to layout.</p>
          </div>
        </div>
      </div>
      <animated.div
        style={popupAnimation}
        className='invisible absolute bottom-0 right-10 max-w-[300px] md:visible flex flex-col'
      >
        <h1 className='text-right'>
          <span
            className='w-[40px] h-[40px] float-right rounded-full bg-white shadow-xl mb-5 relative cursor-pointer'
            onClick={() => setShowPopup(false)}
          >
            <FaTimes className='text-lg mt-4 ml-3 text-skin' />
          </span>
        </h1>
        <div
          className='flex flex-col bg-brand-secondary p-4 rounded-xl cursor-pointer'
          onClick={() => openModal('BANNER_VIDEO')}
        >
          <h1 className='text-xs text-white text-center pb-5'>Watch this</h1>
          <img src='/assets/images/home/banner-video.png'  alt="banner"/>
        </div>
      </animated.div>
    </div>
  );
};

export default BannerGrid;
