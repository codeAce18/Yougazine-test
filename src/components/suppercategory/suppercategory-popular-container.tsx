import {ROUTES} from '@utils/routes';
import {LIMITS} from "@framework/utils/limits";
import ProductsCarousel from '@components/product/products-carousel';

interface Props {
    data: any;
    isLoading: any;
    error?: any;
    rowCarousel?: number;
    showBanner?: boolean;
    lang: string;
}
const SupperCategoryContainer: React.FC<Props> = ({lang,data, isLoading, error,rowCarousel=1, showBanner}) => {
    let breakpoints:object = {};
    if(showBanner){
         breakpoints = {
            '1536': {
                slidesPerView: 4,
            },
            '1280': {
                slidesPerView: 3,
            },
            '1024': {
                slidesPerView: 4,
            },
            '640': {
                slidesPerView: 3,
            },
            '360': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        };
    }else{
         breakpoints = {
            '1536': {
                slidesPerView: 5,
            },
            '1280': {
                slidesPerView: 4,
            },
            '1024': {
                slidesPerView: 4,
            },
            '640': {
                slidesPerView: 3,
            },
            '360': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        };
    }


    return (
      <ProductsCarousel
        lang={lang}
        sectionHeading=""
        categorySlug={ROUTES.PRODUCTS}
        products={data}
        loading={isLoading}
        error={error?.message}
        limit={LIMITS.FASHION_PRODUCTS_LIMITS}
        uniqueKey="suppercategory"
        carouselBreakpoint={breakpoints}
        rowCarousel={rowCarousel}
        variant={'cardv2'}
      />
    );
};
export default SupperCategoryContainer;
