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
import { useOrderQuery } from '@framework/order/get-order';
import { useOrdersQuery } from '@framework/order/get-all-orders';
import ProjectCard from './project-card';
import { useProjectsQuery } from '@framework/project/get-all-project';

interface ProjectGridProps {
  lang: string;
  className?: string;
    viewAs: boolean;
}

export const ProjectGrid: FC<ProjectGridProps> = ({ className = '', lang,viewAs }) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const { getParams, query } = useQueryParam(pathname ?? '/');
  const newQuery: any = getParams(
      // @ts-ignore
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`,
  );

  const {
    isFetching: isLoading,
    data,
    error,
  } = useProjectsQuery({});
  return (
    <>
      <div
          className={`${ viewAs ? 'grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-5' : 'grid grid-cols-1 gap-8 m-2'} ${className}`}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isLoading && !data?.data?.length ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          data?.data?.map((project: any) => {
              return (<ProjectCard
                  key={`project--key-${project._id}`}
                  project={project}
                  project_id={project._id}
                  lang={lang}
              />)
          })
        )}
        {/* end of error state */}
      </div>
    </>
  );
};
