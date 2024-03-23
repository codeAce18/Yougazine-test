'use client';
import { LIMITS } from '@framework/utils/limits';
import ListingTabsList from '@components/product/listingtabs/listingtabs-list-v2';
import ListingTabsContainer from '@components/product/listingtabs/listingtabs-container-v2';
import { useElectronicProductsQuery } from '@framework/product/get-all-electronic-products';
import { useElectronicCategoryQuery } from '@framework/product/get-electronic-category';
import { usePhonesCategoryQuery } from '@framework/product/get-phones-category';
import { useComputerCategoryQuery } from '@framework/product/get-computer-category';


type BoxProps = {
  showBanner: string;
  lang: string;
};

export default function ListingTabsComputerFeed(props: BoxProps) {
  const { data: category } = useComputerCategoryQuery({
    limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
  });
  const {
    data: data,
    isLoading,
    error,
  } = useElectronicProductsQuery({
    limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
  });
  const { showBanner, lang } = props;
  const banner_url = '/assets/images/collection/banner_cate_home7_2.jpg';

  return (
    <div className="mb-8 lg:mb-12">
      <div className="listing-tabs">
        <ListingTabsList
          lang={lang}
          className={`ltabs-heading`}
          data={category}
        />
        <ListingTabsContainer
          lang={lang}
          data={data}
          category={category}
          isLoading={isLoading}
          error={error}
          showBanner={showBanner}
          banner_url={banner_url}
        />
      </div>
    </div>
  );
}
