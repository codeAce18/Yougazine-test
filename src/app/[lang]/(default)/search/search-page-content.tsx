'use client';

import { ProductGrid } from '@components/product/product-grid';
import { ShopFilters } from '@components/search/filters';
import SearchTopBar from '@components/search/search-top-bar';
import Container from '@components/ui/container';
import { Element } from 'react-scroll';
import Breadcrumb from "@components/ui/breadcrumb";
import { useState } from "react";

export default function SearchPageContent({ lang }: { lang: string }) {
  const [viewAs, setViewAs] = useState(Boolean(true));
  return (
    <>
      <Container>
        {/* @ts-ignore */}
        <div className="pt-6 pb-2">
          <Breadcrumb lang={lang} />
        </div>
      </Container>
      <div className="relative lg:sticky block h-full shrink-0 lg:block w-full lg:top-[61px] px-2 z-30 text-center product-filter" style={{backgroundImage: 'url(/assets/images/search-banner.png)', backgroundSize: 'cover'}}>
        <ShopFilters lang={lang} />
      </div>
      <Container>
        <Element name="grid" className="flex flex-col pt-7 lg:pt-11 pb-16 lg:pb-20 products-category">

          <div className="w-full lg:-mt-1">
            <SearchTopBar lang={lang} viewAs={viewAs} onNavClick={setViewAs} />
            <ProductGrid lang={lang} viewAs={viewAs} />
          </div>
        </Element>
      </Container>
    </>
  );
}
