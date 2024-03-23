'use client';

import BannerCard from '@components/cards/banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';

const breakpoints = {
    '1536': {
        slidesPerView: 7,
        spaceBetween: 20,
      },
      '1280': {
        slidesPerView: 5,
        spaceBetween: 16,
      },
      '1024': {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      '520': {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      '0': {
        slidesPerView: 2,
      },
  };

interface BannerProps {
  lang: string;
  data: any;
  className?: string;
  layout?: string;
  buttonSize?: 'default' | 'small';
}

const BannerAllCarousel: React.FC<BannerProps> = ({
  data,
  className = 'mb-6',
  buttonSize = 'default',
  layout,
  lang,
}) => {
    const classCarousel =  layout == "home4" ? "py-5  md:py-5 bg-white " : "py-5  md:py-10";
    return (
    <div className={className}>
      <Carousel
        autoplay={false}
        breakpoints={breakpoints}
        buttonSize={buttonSize}
        prevActivateId="all-banner-carousel-button-prev"
        nextActivateId="all-banner-carousel-button-next"
        lang={lang}
        className={classCarousel}
      >
        {data?.map((banner: any) => (
          <SwiperSlide key={`all-banner--key${banner.id}`}>
            <BannerCard banner={banner} effectActive={true} lang={lang} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerAllCarousel;
