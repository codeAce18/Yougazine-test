'use client';

import React, { useRef } from 'react';
import 'swiper/css/autoplay';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import {
  Swiper,
  Navigation,
  Autoplay,
  Pagination,
  Grid,
} from '@components/ui/carousel/slider';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';

type CarouselPropsType = {
  lang: string;
  className?: string;
  buttonGroupClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  buttonSize?: 'default' | 'small';
  centeredSlides?: boolean;
  loop?: boolean;
  slidesPerColumn?: number;
  breakpoints?: {} | any;
  pagination?: {} | any;
  navigation?: {} | any;
  autoplay?: {} | any;
  grid?: {} | any;
};

export default function Carousel({
  lang,
  children,
  className = '',
  buttonGroupClassName = '',
  prevActivateId = '',
  nextActivateId = '',
  prevButtonClassName = ' start-3 xl:start-8 ',
  nextButtonClassName = ' end-3 xl:end-8',
  buttonSize = 'default',
  breakpoints,
  navigation = true,
  pagination = false,
  loop = false,
  grid,
  spaceBetween = 20,
  autoplay,
  ...props
}: React.PropsWithChildren<CarouselPropsType>) {
  const dir = getDirection(lang);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  let nextButtonClasses = cn(
    'swiper-next w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded bg-brand-light absolute transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none transform shadow-navigation',
    { '3xl:text-2xl': buttonSize === 'default' },
    nextButtonClassName
  );
  let prevButtonClasses = cn(
    'swiper-prev w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded bg-brand-light absolute transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none transform shadow-navigation',
    { '3xl:text-2xl': buttonSize === 'default' },
    prevButtonClassName
  );
  return (
    <div
      className={`carouselWrapper relative ${className} ${
        pagination ? 'dotsCircle' : 'dotsCircleNone'
      }`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        dir={dir}
        pagination={pagination}
        grid={grid}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!, // Assert non-null
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current!, // Assert non-null
              }
            : {}
        }
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`swiper-button flex items-center w-full absolute  z-10  ${
              buttonGroupClassName ? buttonGroupClassName : 'top-2/4'
          }`}
        >
          {prevActivateId.length > 0 ? (
            <div className={prevButtonClasses} id={prevActivateId}>
              {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
          ) : (
            <div ref={prevRef} className={prevButtonClasses}>
              {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
          )}

          {nextActivateId.length > 0 ? (
            <div className={nextButtonClasses} id={nextActivateId}>
              {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          ) : (
            <div ref={nextRef} className={nextButtonClasses}>
              {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
