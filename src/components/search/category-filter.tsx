import Heading from '@components/ui/heading';
import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useTranslation } from 'src/app/i18n/client';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import CategoryCardLoader from '@components/ui/loaders/category-card-loader';
import SearchBox from '@components/common/search-box';
import Search from '@components/common/search';



export const CategoryFilter = ({ lang }: { lang: string }) => {
  const { t } = useTranslation(lang, 'common');
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });
  const uniqueKey = "category-filter"

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="px-2 mt-8 w-72">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }
  if (error) return <Alert message={error.message} />;

  return (
    <div className="flex flex-col text-center items-center pt-6">
      <Heading className="lg:text-xl mb-5 -mt-1 block-title text-white">{t('search-page-title')}</Heading>
      <Search lang={lang}></Search>
      <div className="max-h-full w-full overflow-hidden">
        <CategoryFilterMenu items={data?.categories?.data} lang={lang} />
      </div>
    </div>
  );
};
