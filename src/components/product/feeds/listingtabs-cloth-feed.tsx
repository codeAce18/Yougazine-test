"use client";
import { LIMITS } from '@framework/utils/limits';
import ListingTabsList from "@components/product/listingtabs/listingtabs-list";
import ListingTabsContainer from "@components/product/listingtabs/listingtabs-container";
import { useClothCategoryQuery } from '@framework/product/get-cloth-category';
import {usefashionProductsQuery} from "@framework/product/get-all-fashion-products";


export default function ListingTabsClothFeed(props: any) {
  const { data: category } = useClothCategoryQuery({
    limit: LIMITS.FASHION_PRODUCTS_LIMITS,
  });
  const { data: data, isLoading, error } = usefashionProductsQuery({
    limit: LIMITS.FASHION_PRODUCTS_LIMITS,
  });
  const {colSiderbar, lang} = props;

  return (
      <div className="mb-8 lg:mb-12 navTopSlider">
        <div className="listing-tabs" >
          <ListingTabsList lang={lang} className={`ltabs-heading`} data={category}/>
          <ListingTabsContainer lang={lang} data={data} isLoading={isLoading} error={error} colSiderbar={colSiderbar}/>
        </div>
      </div>
  );
}
