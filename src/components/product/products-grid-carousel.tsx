'use client';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import SectionHeader from '@components/common/section-header';
import ProductCard from "@components/product/product-cards/product-card";
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { Product } from '@framework/types';
import Alert from '@components/ui/alert';
import useWindowSize from '@utils/use-window-size';


interface ProductsProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  headingPosition?: 'left' | 'center';
  className?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  limit?: number;
  uniqueKey?: string;
  variant?: string;
  borderCarousel?: boolean;
  carouselBreakpoint?: {} | any;
  rowCarousel?: number;
  lang?: string;
}
const breakpoints = {
    '1536': {
        slidesPerView: 6,
    },
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

const ProductsGridCarousel: React.FC<ProductsProps> = ({
  sectionHeading,
  headingPosition = 'center',
  className = 'mb-12 lg:mb-14 xl:mb-16',
  products,
  loading,
  error,
  limit,
  uniqueKey,
  variant = 'alpine',
  borderCarousel,
  carouselBreakpoint,
  rowCarousel= 1,
  lang,
}) => {
    const { width } = useWindowSize();
    if(width!  < 767 ) limit = 4;
  return (
    <div className={`${className}`}>
      <SectionHeader sectionHeading={sectionHeading} lang={lang} />

      {error ? (
        <div className="2xl:pe-10">
          <Alert message={error} />
        </div>
      ) : (
        <div
          className={`heightFull relative ${
            borderCarousel != undefined
              ? 'p-3 border border-black/10 rounded bg-white'
              : ''
          } `}
        >
          <Carousel
            lang={lang}
            grid={{ rows: rowCarousel, fill: 'row' }}
            breakpoints={carouselBreakpoint ? carouselBreakpoint : breakpoints}
            prevButtonClassName="start-3  -top-12 3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
            nextButtonClassName={`end-3 -top-12 3xl:top-auto transform 2xl:translate-x-0 3xl:-translate-y-2 xl:translate-x-2.5`}
          >
            {loading && !products?.length ? (
              Array.from({ length: limit! }).map((_, idx) => (
                <SwiperSlide
                  key={`${uniqueKey}-${idx}`}
                  className="px-1.5 md:px-2 xl:px-2.5"
                >
                  <ProductCardLoader uniqueKey={`${uniqueKey}-${idx}`} />
                </SwiperSlide>
              ))
            ) : (
              <>
                {products?.slice(0, limit)?.map((product: any, idx) => (
                  <SwiperSlide
                    key={`${uniqueKey}-${idx}`}
                    className="px-1.5 md:px-2 xl:px-2.5"
                  >
                    <ProductCard lang={lang} product={product} />
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

export default ProductsGridCarousel;
