'use client';

import type { FC } from 'react';
import { usePopularProductsQuery } from '@framework/product/get-all-popular-products';
import ProductsCarousel from '@components/product/products-carousel-v2';;
import { LIMITS } from '@framework/utils/limits';

interface ProductFeedProps {
  lang: string;
  className?: string;
  variant?: string;
}

const PopularProductFeed: FC<ProductFeedProps> = ({
  lang,
  className,
  variant,
}) => {
  const limit = LIMITS.POPULAR_PRODUCTS_LIMITS;
  const { data, isLoading, error } = usePopularProductsQuery({
    limit: limit,
  });
  return (
    <ProductsCarousel
      sectionHeading="text-popular-product"
      sectionSubHeading="text-fresh-grocery-items"
      className={className}
      products={data}
      loading={isLoading}
      className="mb-8 lg:mb-12"
      error={error?.message}
      limit={limit}
      uniqueKey="popular-product"
      variant={variant}
      lang={lang}
    />
  );
};

export default PopularProductFeed;
