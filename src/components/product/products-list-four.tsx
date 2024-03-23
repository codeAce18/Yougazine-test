'use client';
import SectionHeader from '@components/common/section-header';
import ProductList from '@components/product/product-cards/product-list-v2';
import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";
import {SwiperSlide} from "@components/ui/carousel/slider";
import {Product} from '@framework/types';
import Alert from '@components/ui/alert';
import Carousel from "@components/ui/carousel/carousel";
import useWindowSize from "@utils/use-window-size";

interface ProductsProps {
    lang: string;
    sectionHeading: string;
    className?: string;
    products?: Product[];
    loading: boolean;
    error?: string;
    limit?: number;
    uniqueKey?: string;
}

const breakpoints = {
    '1536': {
        slidesPerView: 5,
    },
    '1280': {
        slidesPerView: 4,
    },
    '1024': {
        slidesPerView: 3,
    },
    '768': {
        slidesPerView: 2,
    },
    '540': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};
const ProductsListBlock: React.FC<ProductsProps> = ({
    lang,
    sectionHeading,
    className = 'mb-8 lg:mb-12',
    products,
    loading,
    error,
    limit,
    uniqueKey,
     }) => {
    const {width} = useWindowSize();
    if(width!  < 767 ) limit = 5;
    return (
        <div className={`${className}`}>
            {
                sectionHeading && (
                    <div className=" mb-3">
                        <SectionHeader sectionHeading={sectionHeading} className="mb-0"/>
                    </div>
                )
            }
            {error ? (
                <div className="2xl:pe-10">
                    <Alert lang={lang} message={error}/>
                </div>
            ) : (
                <div className="heightFull relative rounded border border-black/10 bg-white">
                    <Carousel
                        lang={lang}
                        breakpoints={breakpoints}
                        autoplay={false}
                        navigation={true}
                        className="xl:px-3 xl:py-3"
                        prevActivateId="newarrival-carousel-button-prev"
                        nextActivateId="newarrival-carousel-button-next"
                    >
                        {loading && !products?.length ? (
                            Array.from({length: limit!}).map((_, idx) => (
                                <SwiperSlide
                                    key={`${uniqueKey}-${idx}`}
                                    className="pt-5 pb-3"
                                >
                                    <CategoryListCardLoader uniqueKey={`${uniqueKey}-${idx}`}/>
                                </SwiperSlide>
                            ))
                        ) : (
                            <>
                                {products?.slice(0, limit).map((product: any, idx) => (
                                    <SwiperSlide
                                        key={`${uniqueKey}-${idx}`}
                                        className="pt-5 pb-3 "
                                    >
                                        <ProductList product={product} lang={lang}/>
                                    </SwiperSlide>
                                ))}

                            </>
                        )}
                    </Carousel>
                </div>
            )}

        </div>
    );
};

export default ProductsListBlock;
