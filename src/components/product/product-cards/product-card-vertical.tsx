import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { Eye } from '@components/icons/eye-icon';
import { useCart } from '@contexts/cart/cart.context';

import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
import { useTranslation } from 'src/app/i18n/client';
import { ROUTES } from '@utils/routes';
import Link from '@components/ui/link';
import SearchIcon from '@components/icons/search-icon';
import externaImageLoader from '@utils/external-image-loader';
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  lang: string;
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data, lang }: any = props;
  // console.log(variant);
  const { t } = useTranslation(lang, 'common');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
        <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
        <button
            className="min-w-[150px] px-4 py-2 bg-brand rounded-full  text-brand-light text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
            aria-label="Count Button"
            onClick={handlePopupView}
        >
          {t('text-product-details')}
        </button>
    );
  }
  return <AddToCart data={data} variant="mercury" lang={lang} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className, lang }) => {
  const { name, preview_images, category, slug, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang, 'common');
  const { width } = useWindowSize();
  const iconSize = width! > 1024 ? '20' : '17';
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'USD',
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: 'USD',
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: 'USD',
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'product-card overflow-hidden relative grid grid-cols-7 gap-2',
        className
      )}
      title={name}
    >
      <div className="col-span-2 md:col-span-1 xl:col-span-3">
        <div className="relative card-img-container overflow-hidden mx-auto w-full h-[100px] md:h-[100px] ">
          <Image
            loader={externaImageLoader}
            src={preview_images[0].image ?? productPlaceholder}
            alt={name || 'Product Image'}
            quality={100}
            priority
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="object-cover bg-fill-thumbnail"
          />
        </div>
      </div>

      <div className="col-span-5 md:col-span-5 xl:col-span-4">
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/${slug}`}
          className="text-skin-base text-sm leading-5  line-clamp-2 mb-2 hover:text-brand"
        >
          {name}
        </Link>
        <div className="text-[12px] sm:text-sm mt-auto text-gray-400 mb-2">
          {category[0].name}
        </div>

        <div className="space-s-2 mb-4 ">
          <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="mx-1 text-sm text-gray-400 text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
