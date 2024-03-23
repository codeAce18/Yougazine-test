'use client';

import BannerCard from '@components/cards/banner-hero-card';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';

interface BannerProps {
  lang: string;
  data: any;
  className?: string;
  girdClassName?: string;
}

const BannerHeroGrid: React.FC<BannerProps> = ({
  lang,
  data,
  className = 'mb-3 md:mb-4 lg:mb-5 xl:mb-6',
  girdClassName = '2xl:gap-5',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={`heightFull ${className}`}>
      {width! < 480 ? (
        <Carousel
          prevActivateId="banner-carousel-button-prev"
          nextActivateId="banner-carousel-button-next"
          lang={lang}
        >
          {data?.map((banner: any) => (
            <SwiperSlide key={`banner-key-${banner.id}`}>
              <BannerCard banner={banner} effectActive={true} lang={lang} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div
          className={`grid gap-4 2xl:gap-5 3xl:gap-7 grid-cols-2 ${girdClassName}`}
        >
          {data?.map((banner: any) => (
            <BannerCard
              key={`banner--key${banner.id}`}
              banner={banner}
              effectActive={true}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerHeroGrid;
