"use client";
import type { FC } from 'react';
import {useNewArrivalProductsQuery} from '@framework/product/get-all-new-arrival-products';
import ProductsListBlock from '../products-list-block';
import { LIMITS } from '@framework/utils/limits';

interface ProductFeedProps {
  className?: string;
  lang: string;
}

const NewSidebarProductFeed: FC<ProductFeedProps> = ({ className, lang }) => {
  const { data, isLoading, error } = useNewArrivalProductsQuery({
    limit: LIMITS.NEW_ARRIVAL_PRODUCTS_LIMITS,
  });
  return (
    <ProductsListBlock
      lang = {lang}
      sectionHeading="text-new-arrival"
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.NEW_ARRIVAL_PRODUCTS_LIMITS}
      uniqueKey="new"
    />
  );
};
export default NewSidebarProductFeed;
