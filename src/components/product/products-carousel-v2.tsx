import SectionHeader from '@components/common/section-header';
import { Product } from '@framework/types';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import Alert from '@components/ui/alert';
import useWindowSize from '@utils/use-window-size';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { getDirection } from '@utils/get-direction';
import ProductCardV2 from "@components/product/product-cards/product-card-v2";
import ProductCard from '@components/product/product-cards/product-card';
import React from "react";

interface ProductsCarouselProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  limit?: number;
  uniqueKey?: string;
  carouselBreakpoint?: {} | any;
  borderCarousel?: boolean;
  lang: string;
    rowCarousel?: number;
    variant?: string;
}

const breakpoints = {
 
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
  sectionHeading,
  categorySlug,
  className = '',
  products,
  loading,
  error,
  limit,
  uniqueKey,
  carouselBreakpoint,
  lang,
  variant = 'default',
  borderCarousel,
  rowCarousel= 1,
}) => {
  const dir = getDirection(lang);
  return (
    <div className={cn('relative', className)}>
      {sectionHeading && (
          <div className="mb-3 md:mb-5">
          <SectionHeader
            sectionHeading={sectionHeading}
            sectionSubHeading={'text-best-sellers-subheading'}
            headingPosition={"center"}
            className={'mb-5 text-center'}
            lang={lang}
          />
        </div>
      )}
      {error ? (
        <div className="2xl:ltr:pr-10 2xl:rtl:pl-10">
          <Alert message={error} />
        </div>
      ) : (
        <div
          className={`heightFull relative after-item-opacity ${
            borderCarousel != undefined
              ? 'p-3 border border-black/10 rounded bg-white'
              : ''
          } `}
        >
          <Carousel
            grid={{ rows: rowCarousel, fill: 'row' }}
            breakpoints={carouselBreakpoint || breakpoints}
            className=""
            prevButtonClassName="start-3  -top-12 3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
            nextButtonClassName={`end-3 -top-12 3xl:top-auto transform 2xl:translate-x-0 3xl:-translate-y-2 ${
              dir === 'rtl' ? 'xl:-translate-x-2.5' : 'xl:translate-x-2.5'
            }`}
            lang={lang}
          >
            {loading && !products?.length ? (
              Array.from({ length: limit! }).map((_, idx) => (
                <SwiperSlide
                  key={`${uniqueKey}-${idx}`}
                  className="px-1.5 md:px-2 xl:px-2.5 py-1 w-60"
                >
                  <ProductCardLoader uniqueKey={`${uniqueKey}-${idx}`} />
                </SwiperSlide>
              ))
            ) : (
              <>
                {products?.map((product: any, idx) => (
                  <SwiperSlide
                    key={`${uniqueKey}-${idx}`}
                  >
                    {variant === 'cardv2' ? (
                      <ProductCardV2
                        key={`${uniqueKey}-${product.id}`}
                        product={product}
                        lang={lang}
                      />
                    ) : (
                      <ProductCard
                        key={`${uniqueKey}-${product.id}`}
                        product={product}
                        lang={lang}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ProductsCarousel;
