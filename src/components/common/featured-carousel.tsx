'use client';

import LicenseIcon from '@components/icons/featured/license-icon';
import FeedbackIcon from '@components/icons/featured/feedback-icon';

import FeaturedCard from '@components/cards/featured-card';
import Carousel from '@components/ui/carousel/carousel';
import DeliveryIcon from "@components/icons/featured/delivery-icon";
import CardIcon from "@components/icons/featured/card-icon";
import SupportIcon from "@components/icons/featured/support-icon";
import { SwiperSlide } from '@components/ui/carousel/slider';
import {ROUTES} from "@utils/routes";

const data = [
    {
        id: 1,
        icon: (
            <DeliveryIcon
                color="#da348f"
            />
        ),
        title: 'feature-title-one',
        description: 'feature-title-one-description',
        href: ROUTES.SEARCH,
    },
    {
        id: 2,
        icon: (
            <CardIcon
                color="#da348f"
            />
        ),
        title: 'feature-title-two',
        description: 'feature-title-two-description',
        href: ROUTES.SEARCH,
    },
    {
        id: 3,
        icon: (
            <FeedbackIcon
                color="#da348f"
            />
        ),
        title: 'feature-title-three',
        description: 'feature-title-three-description',
        href: ROUTES.SEARCH,
    },
    {
        id: 4,
        icon: (
            <SupportIcon
                color="#da348f"
            />
        ),
        title: 'feature-title-four',
        description: 'feature-title-four-description',
        href: ROUTES.SEARCH,
    },
    {
        id: 5,
        icon: (
            <LicenseIcon
                color="#da348f"
            />
        ),
        title: 'feature-title-five',
        description: 'feature-title-five-description',
        href: ROUTES.SEARCH,
    },
];

interface Props {
  lang: string;
  className?: string;
}

const breakpoints = {
  '1400': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
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

const FeatureCarousel: React.FC<Props> = ({
  lang,
  className = 'mb-8 md:mb-10',
}) => {
  return (
    <div className={`heightFull bg-skin-lightfill bg-opacity-50 ${className}`}>
      <Carousel
        autoplay={false}
        breakpoints={breakpoints}
        prevActivateId="featured-carousel-button-prev"
        nextActivateId="featured-carousel-button-next"
        lang={lang}
        prevButtonClassName="start-3  3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
        nextButtonClassName={`end-3  3xl:top-auto transform 2xl:translate-x-0 3xl:-translate-y-2 `}
        className={`pt-60 pb-5`}
      >
        {data?.map((item) => (
          <SwiperSlide key={`featured-key-${item.id}`}>
            <FeaturedCard item={item} lang={lang} layout={"home4"} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default FeatureCarousel;
