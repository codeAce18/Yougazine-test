'use client';

import dynamic from 'next/dynamic';
import CategoryCard from '@components/cards/category-card';
import SectionHeader from '@components/common/section-header';
import {ROUTES} from '@utils/routes';
import Alert from '@components/ui/alert';
import {SwiperSlide} from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import {LIMITS} from '@framework/utils/limits';
import {useCategoriesQuery} from "@framework/category/get-all-categories";
import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";
import Container from '@components/ui/container';

const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
  ssr: false,
});

interface CategoriesProps {
  lang: string;
  className?: string;
}

const breakpoints = {
  '1480': {
    slidesPerView: 4,
    spaceBetween: 1
  },
  '1280': {
    slidesPerView: 3,
    spaceBetween: 1
  },
  '1024': {
    slidesPerView: 3,
    spaceBetween: 1
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 1
  },
  '600': {
    slidesPerView: 2,
    spaceBetween: 1
  },
  '0': {
    slidesPerView: 1,
    spaceBetween: 1
  },
};

const CategoryGridBlock: React.FC<CategoriesProps> = ({
                                                        className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16',lang
                                                      }) => {
  const {width} = useWindowSize();

  const {data, isLoading, error} = useCategoriesQuery({
    limit: LIMITS.CATEGORIES_LIMITS,
  });
  return (
      <div className={className}>
       <h2 className="heading-with-line text-3xl md:text-4xl lg:text-[40px] cormorant-medium text-black text-center relative">
  <span className="relative px-8 bg-white">Choose a template</span>
</h2>

        <Container>
        <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-8">
          {error ? (
            <Alert message={error?.message} className="col-span-4"/>
          ) : (
            <>
              {isLoading && !data
                ? Array.from({length: 8}).map((_, idx) => (
                    <CategoryListCardLoader key={`category-card-${idx}`} />
                  ))
                : data?.categories?.data?.slice(0, 8)?.map((category) => (
                    <CategoryCard
                      key={category.id}
                      lang={lang}
                      item={category}
                      href={`/${lang}/get-started/template?category=${category.slug}`}
                      className="bg-white p-6"
                    />
                  ))}
            </>
          )}
        </div>

        </Container>
      </div>
  );
};

export default CategoryGridBlock;
