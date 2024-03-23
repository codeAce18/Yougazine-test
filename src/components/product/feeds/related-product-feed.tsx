'use client';

import ProductsCarousel from '@components/product/products-carousel';
import { useRelatedProductsQuery } from '@framework/product/get-related-product';
import { LIMITS } from '@framework/utils/limits';

interface RelatedProductsProps {
  lang: string;
  carouselBreakpoint?: {} | any;
  className?: string;
  category?: string
  uniqueKey?: string;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  lang,
  carouselBreakpoint,
  category,
  className,
  uniqueKey = 'related-product-popup',
}) => {
  const { data, isLoading, error } = useRelatedProductsQuery({
    limit: LIMITS.RELATED_PRODUCTS_LIMITS,
    category: category,
  });
  return (
    <ProductsCarousel
      sectionHeading="text-related-products"
      categorySlug="/search"
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
      lang={lang}
    />
  );
};

export default RelatedProductFeed;
