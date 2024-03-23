'use client';

import ProductsListBlock from '@components/product/products-list-block';
import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import { LIMITS } from '@framework/utils/limits';
import { ROUTES } from '@utils/routes';

export default function BestSellerSidebarProductFeed({ lang }: { lang: string }) {
  const { data, isLoading, error } = useBestSellerProductsQuery({
    limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
  });

  return (
    <ProductsListBlock
      sectionHeading="text-best-sellers"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
      lang={lang}
      className={`mb-8`}
    />
  );
}
