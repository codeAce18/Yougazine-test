"use client";
import {usePopularProductsQuery} from '@framework/product/get-all-popular-products';
import SectionHeader from '@components/common/section-header';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import {LIMITS} from '@framework/utils/limits';
import Alert from '@components/ui/alert';
import ProductFlashSellCard from '@components/product/product-cards/product-flash-sell-card';
import { useTranslation } from 'src/app/i18n/client';
import Carousel from "@components/ui/carousel/carousel";
import {SwiperSlide} from "@components/ui/carousel/slider";
import React from "react";


interface ProductFeedProps {
    lang?: string;
    className?: string;
    uniqueKey?: string;
}

const breakpoints = {
    '1280': {
        slidesPerView: 2,
    },
    '1024': {
        slidesPerView: 1,
    },
    '640': {
        slidesPerView: 1,
    },
    '0': {
        slidesPerView: 1,
    },
};

const ProductWithBestDeals: React.FC<ProductFeedProps> = ({lang,
                                                              className = '',
                                                              uniqueKey,
                                                          }) => {
    const limit = LIMITS.POPULAR_PRODUCTS_TWO_LIMITS;
    const {data, isLoading, error} = usePopularProductsQuery({
        limit: limit,
    });

    return (
        <div className={`mb-8 ${className}`}>
            <SectionHeader lang={lang} sectionHeading="text-deals-of-the-week" className="mb-6 block-title"/>
            {error ? (
                <Alert message={error?.message} className="col-span-full"/>
            ) : (
                <div className="heightFull relative">
                    <Carousel
                        lang={lang}
                        breakpoints={breakpoints}
                        className=""
                        prevButtonClassName="start-3  -top-12 3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
                        nextButtonClassName={`end-3  -top-12 3xl:top-auto transform 2xl:translate-x-0 3xl:-translate-y-2 xl:-translate-x-2.5`}

                    >
                        {isLoading && !data?.length ? (
                            Array.from({length: limit!}).map((_, idx) => (
                                <ProductCardLoader uniqueKey={`${uniqueKey}-${idx}`}  key={`popular-product-${idx}`} />
                            ))
                        ) : (
                            <>
                                {data?.slice(0, limit).map((product: any, idx) => (
                                    <SwiperSlide
                                        key={`${uniqueKey}-${idx}`}
                                        className="py-1.5 "
                                    >
                                        <ProductFlashSellCard
                                            lang={lang}
                                            key={`popular-product-${product.id}`} product={product}
                                            date={Date.now() + 4000000 * 60}/>
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

export default ProductWithBestDeals;
