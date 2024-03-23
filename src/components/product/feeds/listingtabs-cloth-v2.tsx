"use client";
import { LIMITS } from '@framework/utils/limits';
import ListingTabsList from "@components/product/listingtabs/listingtabs-list-v2";
import ListingTabsContainer from "@components/product/listingtabs/listingtabs-container-v2";
import { useClothCategoryQuery } from '@framework/product/get-cloth-category';
import {usefashionProductsQuery} from "@framework/product/get-all-fashion-products";

type BoxProps = {
  showBanner?: string;
  lang: string;
};

export default function ListingTabsClothFeed(props: BoxProps) {
  const { data: category } = useClothCategoryQuery({
    limit: LIMITS.FASHION_PRODUCTS_LIMITS,
  });
  const { data: data, isLoading, error } = usefashionProductsQuery({
    limit: LIMITS.FASHION_PRODUCTS_LIMITS,
  });
  const {showBanner,lang} = props;
  const banner_url = '/assets/images/collection/banner_cate_home7_4.jpg';

  return (
      <div className="mb-8 lg:mb-12">
        <div className="listing-tabs">
          <ListingTabsList lang={lang} className={`ltabs-heading`} data={category}/>
          <ListingTabsContainer lang={lang}  data={data} category={category} isLoading={isLoading} error={error} showBanner={showBanner} banner_url={banner_url}/>
        </div>
      </div>
  );
}
