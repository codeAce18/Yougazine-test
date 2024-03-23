'use client';
import type { FC } from 'react';
import {useNewArrivalProductsQuery} from '@framework/product/get-all-new-arrival-products';
import ProductsListBlock from '../products-list-four';
import { LIMITS } from '@framework/utils/limits';

interface ProductFeedProps {
  lang?: string;
  className?: string;
}

const NewProductFeed: FC<ProductFeedProps> = ({lang, className }) => {
  const { data, isLoading, error } = useNewArrivalProductsQuery({
    limit: LIMITS.NEW_ARRIVAL_PRODUCTS_LIMITS,
  });
  return (
    <ProductsListBlock
      lang={lang}
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
export default NewProductFeed;
