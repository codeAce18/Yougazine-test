import SectionHeader from '@components/common/section-header';
import ProductCardVertical from '@components/product/product-cards/product-card-vertical';
import { Product } from '@framework/types';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import Alert from '@components/ui/alert';
import SeeAll from '@components/ui/see-all';
import useWindowSize from '@utils/use-window-size';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { getDirection } from '@utils/get-direction';

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
  lang: string;
}

const breakpoints = {
  '1024': {
    slidesPerView: 1,
  },
  '640': {
    slidesPerView: 1,
  },
  '0': {
    slidesPerView: 1,
  },
};

const ProductsListBlock: React.FC<ProductsCarouselProps> = ({
  sectionHeading,
  categorySlug,
  className = 'mb-8',
  products,
  loading,
  error,
  limit,
  uniqueKey,
  carouselBreakpoint,
  lang,
}) => {
  const { width } = useWindowSize();
  const dir = getDirection(lang);
  return (
    <div className={cn('relative', className)}>
      {sectionHeading && (
        <div className="mb-5 md:mb-6">
          <SectionHeader
            sectionHeading={sectionHeading}
            className="mb-0 block-title"
            lang={lang}
          />
        </div>
      )}
      {error ? (
        <div className="2xl:ltr:pr-10 2xl:rtl:pl-10">
          <Alert message={error} />
        </div>
      ) : (
        <div className={`heightFull relative extraslider--sidebar`}>
          <Carousel
            breakpoints={breakpoints}
            grid={{
              rows: 3,
              fill: 'row',
            }}
            className=""
            buttonGroupClassName="-top-9"
            prevButtonClassName="end-8 -translate-y-2 "
            nextButtonClassName="end-0 -translate-y-2"
            lang={lang}
          >
            {loading && !products?.length ? (
              Array.from({ length: limit! }).map((_, idx) => (
                <SwiperSlide
                  key={`${uniqueKey}-${idx}`}
                  className="px-1.5 md:px-2 xl:px-2.5 py-1"
                >
                  <ProductCardLoader uniqueKey={`${uniqueKey}-${idx}`} />
                </SwiperSlide>
              ))
            ) : (
              <>
                {products?.map((product: any, idx) => (
                  <SwiperSlide key={`${uniqueKey}-${idx}`}>
                    <ProductCardVertical product={product} lang={lang} />
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

export default ProductsListBlock;
