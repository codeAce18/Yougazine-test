import {ROUTES} from '@utils/routes';
import ProductsCarousel from '@components/product/products-carousel';
import {categoryPlaceholder, productPlaceholder} from "@assets/placeholders";
import Image from "@components/ui/image";
import Link from "next/link";

interface Props {
    lang?: string;
    data: any;
    category: any;
    isLoading: any;
    error?: any;
    banner_url?: string;
    showBanner?: string;
}
const ListingTabsContainer: React.FC<Props> = ({lang,data,category, isLoading, error, showBanner= false,banner_url}) => {
    let breakpoints = {};
    if(showBanner){
         breakpoints = {
            '1536': {
                slidesPerView: 5,
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
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        };
    }else{
         breakpoints = {
             '1536': {
                 slidesPerView: 6,
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
                 slidesPerView: 2,
             },
             '0': {
                 slidesPerView: 1,
             },
        };
    }

    return (
        <div className={`xl:flex border border-black/10 rounded bg-white w-full ${showBanner == 'right' && 'flex-row-reverse' }`} >
            {showBanner && (
                <div className={`hidden xl:flex xl:w-[246px]`}>
                    <Link
                        href={{
                            pathname: `/${lang}${ROUTES.SEARCH}`,
                            query: { category: category?.slug },
                        }}
                    >
                            <div className="card-img-container flex overflow-hidden relative">
                                <Image
                                    src={banner_url ?? categoryPlaceholder}
                                    alt={category?.name}
                                    width={246}
                                    height={325}
                                    quality={100}
                                />
                            </div>
                    </Link>
                </div>
            )}
            <div className={`${showBanner?'banner-main-content':'popular-main-content'} p-2.5 grow`} >
                <ProductsCarousel
                    lang = {lang}
                    categorySlug={ROUTES.PRODUCTS}
                    products={data}
                    loading={isLoading}
                    error={error?.message}
                    uniqueKey="electronic"
                    carouselBreakpoint={breakpoints}
                    variant={'cardv2'}
                />
            </div>

        </div>

    );
};
export default ListingTabsContainer;
