import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@components/ui/carousel/slider';
import Image from '@components/ui/image';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ImageLightBox from '@components/ui/image-lightbox';

interface Props {
  gallery: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
  lang: string;
}

const externaImageLoader = ({ src }: { src: string }) =>
  `https://d2qs6wfbkerq2c.cloudfront.net/${src}`;

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  1280: {
    slidesPerView: 4,
    direction: 'vertical',
  },
  767: {
    slidesPerView: 4,
    direction: 'horizontal',
  },
  0: {
    slidesPerView: 3,
    direction: 'horizontal',
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = 'xl:w-[480px] 2xl:w-[650px]',
  galleryClassName = 'xl:w-[300px] 2xl:w-[350px]',
  lang,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const dir = getDirection(lang);

  return (
    <div className="w-full xl:flex xl:flex-col relative">
      <ImageLightBox gallery={gallery} />
      <div
        className={cn(
          'w-full mb-2.5 md:mb-3  overflow-hidden rounded-md relative',
          // thumbnailClassName
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-gallery-${item._id}`}
              className="flex items-center justify-center"
            >
              <Image
                loader={externaImageLoader}
                src={item?.image ?? productGalleryPlaceholder}
                alt={`Product gallery ${item.id}`}
                width={800}
                height={650}
                className="mx-auto rounded-lg"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <div
            ref={prevRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </div>
          <div
            ref={nextRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={`shrink-0 w-full self-center ${galleryClassName}`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={15}
          watchSlidesProgress={true}
          freeMode={true}
          effect={'slide'}
          className='mr-0'
          breakpoints={{
            1280: {
              slidesPerView: 4,
              direction: 'horizontal',
            },
            767: {
              slidesPerView: 4,
              direction: 'horizontal',
            },
            0: {
              slidesPerView: 3,
              direction: 'horizontal',
            },
          }}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item._id}`}
              className="flex items-center justify-start cursor-pointer rounded overflow-hidden border border-border-base transition hover:opacity-75"
            >
              <Image
                loader={externaImageLoader}
                src={item?.image ?? productGalleryPlaceholder}
                alt={`Product thumb gallery ${item._id}`}
                width={170}
                height={170}
                style={{ width: 'auto' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
