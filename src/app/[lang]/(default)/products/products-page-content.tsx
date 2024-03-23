'use client';

import { ShopFilters } from '@components/search/filters';
import SearchTopBar from '@components/search/search-top-bar';
import Container from '@components/ui/container';
import { Element } from 'react-scroll';
import {useState} from "react";
import { ProductGrid } from '@components/product/product-grid';

export default function ProductsPageContent({ lang }: { lang: string }) {
    const [viewAs, setViewAs] = useState(Boolean(true));
  return (
    <Container>
      {/* @ts-ignore */}
      <Element name="grid" className="flex pb-16 pt-7 lg:pt-11 lg:pb-20">
        <div className="sticky block h-full shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-80 xl:w-96 top-16">
          <ShopFilters lang={lang} />
        </div>
        <div className="w-full lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
            <SearchTopBar lang={lang}  viewAs={viewAs} onNavClick={setViewAs}/>
            <ProductGrid lang={lang} viewAs={viewAs} />
        </div>
      </Element>
    </Container>
  );
}
