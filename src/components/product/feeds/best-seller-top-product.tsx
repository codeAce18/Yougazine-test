'use client';
import type { FC } from 'react';
import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import ProductsCarousel from '@components/product/products-carousel-v2';;
import { LIMITS } from '@framework/utils/limits';

interface ProductFeedProps {
    lang: string;
    className?: string;
    variant?: string;
}

const BestSellerProductFeed: FC<ProductFeedProps> = ({
                                                         lang,
                                                         className,
                                                         variant,
                                                     }) => {
    const { data, isLoading, error } = useBestSellerProductsQuery({
        limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
    });

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

    return (
      <ProductsCarousel
        sectionHeading="text-best-sellers-product"
        products={data}
        loading={isLoading}
        error={error?.message}
        limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
        uniqueKey="best-sellers"
        className="mb-8 lg:mb-12"
        rowCarousel={2}
        carouselBreakpoint={breakpoints}
        variant={variant}
        lang={lang}
      />
    );
};
export default BestSellerProductFeed;
