import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';
import ProductsCarousel from '@components/product/products-carousel';

interface Props {
  data: any;
  isLoading: any;
  error?: any;
  lang: string;
}
const SupperCategoryContainer: React.FC<Props> = ({
  data,
  isLoading,
  error,
  lang,
}) => {
  const breakpoints = {
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
  return (
    <ProductsCarousel
      sectionHeading=""
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.CATEGORIES_LIMITS}
      uniqueKey="fresh-vegetable"
      carouselBreakpoint={breakpoints}
      lang={lang}
    />
  );
};
export default SupperCategoryContainer;
