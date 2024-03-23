"use client";
import {ROUTES} from '@utils/routes';
import ProductsCarousel from '@components/product/products-carousel';

interface Props {
    lang?: string;
    data: any;
    isLoading: any;
    error?: any;
    colSiderbar?: boolean;
}
const ListingTabsContainer: React.FC<Props> = ({lang,data, isLoading, error, colSiderbar= true}) => {
    let breakpoints = {};
    if(colSiderbar){
         breakpoints = {
            '1536': {
                slidesPerView: 4,
            },
            '1280': {
                slidesPerView: 4,
            },
            '1024': {
                slidesPerView: 3,
            },
            '640': {
                slidesPerView: 3,
            },
            '360': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        };
    }else{
         breakpoints = {
            '1536': {
                slidesPerView: 7,
            },
            '1280': {
                slidesPerView: 5,
            },
            '1024': {
                slidesPerView: 3,
            },
            '640': {
                slidesPerView: 3,
            },
            '360': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        };
    }

    return (
        <>
        {isLoading}
        <ProductsCarousel
            lang = {lang}
            sectionHeading=""
            categorySlug={ROUTES.PRODUCTS}
            products={data}
            loading={isLoading}
            error={error?.message}
            uniqueKey="electronic"
            carouselBreakpoint={breakpoints}
        />
        </>
    );
};
export default ListingTabsContainer;
