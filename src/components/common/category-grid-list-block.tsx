'use client';

import SectionHeader from '@components/common/section-header';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQueryHome3 } from '@framework/category/get-all-categories-home3';
import Alert from '@components/ui/alert';
import CategoryListCard from '@components/cards/category-list-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';

interface CategoriesProps {
  lang: string;
  className?: string;
  variant?: 'antique';
}

const breakpoints = {
    '1280': {
        slidesPerView: 5,
    },
    '1024': {
        slidesPerView: 4,
    },
    '640': {
        slidesPerView: 2,
    },
    '360': {
        slidesPerView: 1,
    },
    '0': {
        slidesPerView: 1,
    },
};


const CategoryGridListBlock: React.FC<CategoriesProps> = ({
  lang,
  className = 'mb-8',
  variant,
}) => {
  const { width } = useWindowSize();
  const { data, isLoading, error } = useCategoriesQueryHome3({
    limit: 6,
  });
  const CATEGORIES_LIMITS = 6;

  return (
    <div className={cn(className)}>
        <SectionHeader
            sectionHeading="text-choose-categories"
            sectionSubHeading={'text-best-sellers-subheading'}
            headingPosition={"center"}
            className="mb-5 block-title"
            lang={lang}
          />
        <Carousel
            breakpoints={breakpoints}
            className=""
            prevButtonClassName="ltr:-left-2 rtl:-right-2 md:ltr:-left-2.5 md:rtl:-right-2.5 -translate-y-1/2"
            nextButtonClassName="ltr:-right-2 rtl:-left-2 lg:ltr:-right-2.5 lg:rtl:-left-2.5 -translate-y-1/2"
            grid={{ rows: 1, fill: 'row' }}
            lang={lang}
          >
            {isLoading && !data
              ? Array.from({ length: 6 }).map((_, idx) => {
                  return (
                    <SwiperSlide
                      className="p-1.5 md:p-2"
                      key={`category--key-${idx}`}
                    >
                      <CategoryListCardLoader
                        uniqueKey={`category-card-${idx}`}
                      />
                    </SwiperSlide>
                  );
                })
              : data?.categories?.data?.slice(0, CATEGORIES_LIMITS).map((category) => (
                  <SwiperSlide
                    key={`category--key-${category.id}`}
                  >
                    <CategoryListCard
                      category={category}
                      href={`/${lang}${ROUTES.SEARCH}?category=${category.slug}`}
                      variant={variant}
                      lang={lang}
                    />
                  </SwiperSlide>
                ))}
        </Carousel>
    </div>
  );
};

export default CategoryGridListBlock;
