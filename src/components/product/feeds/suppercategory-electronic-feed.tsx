'use client';

import { LIMITS } from '@framework/utils/limits';
import SupperCategoryList from '@components/suppercategory/suppercategory-list';
import SupperCategoryContainer from '@components/suppercategory/suppercategory-container';

import { useElectronicCategoryQuery } from '@framework/product/get-electronic-category';
import { useElectronicProductsQuery } from '@framework/product/get-all-electronic-products';

import { getDirection } from '@utils/get-direction';

import Image from '@components/ui/image';
import cn from 'classnames';

export default function SupperCategoryElectronicFeed({lang,}: { lang: string; })  {
  const { data: category } = useElectronicCategoryQuery({
    limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
  });

  const {
    data: products,
    isLoading,
    error,
  } = useElectronicProductsQuery({
    limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
  });
  const dir = getDirection(lang);
  const backgroundThumbnail =
    dir === 'ltr'
      ? '/assets/images/collection/cate_1.jpg'
      : '/assets/images/collection/cate_1_rtl.jpg';

  return (
    <div className="mb-8 lg:mb-12">
      <div className="xl:flex border border-black/10">
        <div
          className={`xl:w-[420px] p-7 relative min-h-[365px] overflow-hidden`}
        >
          <div className={'absolute inset-0 '}>
            <Image
              src={backgroundThumbnail}
              alt={'Product Image'}
              width={419}
              height={365}
              quality={75}
              className="object-cover"
            />
          </div>

          <SupperCategoryList
            className={`supper-category--list relative z-10`}
            data={category}
            lang={lang}
          />
        </div>

        <div className="trendy-main-content w-full p-2.5">
          <SupperCategoryContainer
            data={products}
            isLoading={isLoading}
            error={error}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}
