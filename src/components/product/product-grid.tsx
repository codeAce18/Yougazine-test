import type { FC } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardAlpine from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import ProductCardList from '@components/product/product-cards/product-list-view';
import cn from 'classnames';
import { useProductsQuery } from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';
import useQueryParam from '@utils/use-query-params';

interface ProductGridProps {
  lang: string;
  className?: string;
  viewAs: boolean;
  category?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = '', lang,viewAs, category }) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const { getParams, query } = useQueryParam(pathname ?? '/');
  let newQuery: any = getParams(
      // @ts-ignore
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`,
  );
  newQuery = category ? {category: category} : newQuery
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({
    limit: LIMITS.PRODUCTS_LIMITS,
    // @ts-ignore
    newQuery
  });

  return (
    <>
      <div
          className={`${ viewAs ? 'grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid grid-cols-1 gap-8'} ${className}`}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isLoading && !data?.pages?.length ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          data?.pages?.map((page: any) => {
              if(viewAs) {
                  return page?.data?.map((product: Product) => (
                      <ProductCardAlpine
                          key={`product--key-${product.id}`}
                          product={product}
                          lang={lang}
                      />
                  ));
              }else{
                  return page?.data?.map((product: Product) => (
                      <ProductCardList
                          key={`product--key-${product.id}`}
                          product={product}
                          lang={lang}
                      />
                  ));
              }
          })
        )}
        {/* end of error state */}
      </div>
      {/* {hasNextPage && (
        <div className="pt-8 text-center xl:pt-10">
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
            className={'w-60 '}
          >
            {t('button-load-more')}
          </Button>
        </div>
      )} */}
    </>
  );
};
