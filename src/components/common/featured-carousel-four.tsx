'use client';
import LicenseIcon from '@components/icons/featured/license-icon';
import FeedbackIcon from '@components/icons/featured/feedback-icon';

import FeaturedCard from '@components/cards/featured-card';
import Carousel from '@components/ui/carousel/carousel';
import {SwiperSlide} from '@components/ui/carousel/slider';
import {ROUTES} from "@utils/routes";
import DeliveryIcon from "@components/icons/featured/delivery-icon";
import CardIcon from "@components/icons/featured/card-icon";
import SupportIcon from "@components/icons/featured/support-icon";

const data = [
    {
        id: 1,
        icon: (
            <DeliveryIcon
                color="#da348f"
            />
        ),
        title: 'feature4-title-one',
        description: 'feature4-title-one-description',
        href: ROUTES.SEARCH,
    },
    {
        id: 2,
        icon: (
            <CardIcon
                color="#da348f"
            />
        ),
        title: 'feature4-title-two',
        description: 'feature4-title-two-description',
        href: ROUTES.SEARCH,
    },
    {
        id: 3,
        icon: (
            <FeedbackIcon
                color="#da348f"
            />
        ),
        title: 'feature4-title-three',
        description: 'feature4-title-three-description',
        href: ROUTES.SEARCH,
    },
    {
        id: 4,
        icon: (
            <SupportIcon
                color="#da348f"
            />
        ),
        title: 'feature4-title-four',
        description: 'feature4-title-four-description',
        href: ROUTES.SEARCH,
    },
    {
        id: 5,
        icon: (
            <LicenseIcon
                color="#da348f"
            />
        ),
        title: 'feature4-title-five',
        description: 'feature4-title-five-description',
        href: ROUTES.SEARCH,
    },
];

interface Props {
    lang: string;
    className?: string;
    classNameCarousel?: string;
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
    '640 ': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};

const FeatureCarousel: React.FC<Props> = ({lang, className = 'mb-7 md:mb-10 ',classNameCarousel }) => {
    return (
        <div className={`mb-7 md:mb-10 ${className} bg-skin-lightfill `}>
            <Carousel
                lang={lang}
                autoplay={false}
                breakpoints={breakpoints}
                prevActivateId="featured-carousel-button-prev"
                nextActivateId="featured-carousel-button-next"
                prevButtonClassName="start-3  3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
                nextButtonClassName={`end-3  3xl:top-auto transform 2xl:translate-x-0 3xl:-translate-y-2 `}
                className={`rounded border border-black/10 py-6  ${classNameCarousel}`}
            >
                {data?.map((item) => (
                    <SwiperSlide key={`featured-key-${item.id}`}>
                        <FeaturedCard item={item} layout={"home4"} lang={lang} />
                    </SwiperSlide>
                ))}

            </Carousel>
        </div>
    );
};

export default FeatureCarousel;
