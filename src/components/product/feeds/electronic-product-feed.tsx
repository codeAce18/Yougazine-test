'use client';

import { usePopcornJerkyProductsQuery } from '@framework/product/get-all-popcorn-jerky-products';
import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';
import {useElectronicProductsQuery} from "@framework/product/get-all-electronic-products";

export default function ElectronicProductFeed({ lang }: { lang: string }) {
  const { data, isLoading, error } = useElectronicProductsQuery({
    limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
  });
  return (
    <ProductsCarousel
      sectionHeading="text-popcorn-jerky"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.ELETRONIC_PRODUCTS_LIMITS}
      uniqueKey="popcorn-jerky"
      lang={lang}
    />
  );
}
