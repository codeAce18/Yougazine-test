"use client";
import { LIMITS } from '@framework/utils/limits';
import ListingTabsList from "@components/product/listingtabs/listingtabs-list";
import ListingTabsContainer from "@components/product/listingtabs/listingtabs-container";
import { useElectronicProductsQuery } from "@framework/product/get-all-electronic-products";
import { useElectronicCategoryQuery } from '@framework/product/get-electronic-category';
import { useState, useMemo, ReactNode } from "react";
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useProductByCategoryQuery } from '@framework/product/get-product-by-category';
import { ProductGrid } from '../product-grid';

type BoxProps = {
  lang: string;
  colSiderbar?: boolean;
};

export default function ListingTabsElectronicFeed(props: BoxProps) {
  const { data: category } = useCategoriesQuery({
    limit: LIMITS.ELETRONIC_PRODUCTS_LIMITS,
  });

  const { colSiderbar, lang } = props;
  const [activeTabId, setActiveTab] = useState('youwed');
  const { products, setProducts } = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    data: data,
    isLoading,
    error
  } = useProductByCategoryQuery(activeTabId);
  const activeTab = useMemo(() => {
    // @ts-ignore
    if (!activeTabId) {
      setActiveTab(category?.categories?.data[0].slug || '')
    }
  }, [activeTabId]);

  return (
    <div className="mb-8 lg:mb-12 navTopSlider">
      <div className="listing-tabs">
        <ListingTabsList lang={lang} className={`ltabs-heading`} data={category} onNavClick={setActiveTab} activeTabId={activeTabId} />
        {/* <ListingTabsContainer lang={lang} data={data} isLoading={isLoading} error={error} colSiderbar={colSiderbar} /> */}
        <ProductGrid lang={'en'} viewAs={true} category={activeTabId}/>
      </div>
    </div>
  );
}
