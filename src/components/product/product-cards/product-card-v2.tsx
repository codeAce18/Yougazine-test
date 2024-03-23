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
            <span className="text-[11px] md:text-xs font-medium text-brand-light uppercase inline-block bg-brand-danger rounded px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
        );
    }
    if (product_type === 'variable') {
        return (
            <button
                className="min-w-[150px] px-4 py-2 bg-brand rounded text-brand-light text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
                aria-label="Count Button"
                onClick={handlePopupView}
            >
                {t('text-product-details')}
            </button>
        );
    }
    return <AddToCart data={data} variant="cardv2" lang={lang} />;
}
const ProductCardV2: React.FC<ProductProps> = ({ product, className, lang }) => {
    const { name, image, unit, slug, product_type } = product ?? {};
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
          'flex flex-col product-card-v2 relative card-image--jump h-full',
          className
        )}
        title={name}
      >
        <div className="relative flex-shrink-0  mt-4">
          <div className="relative card-img-container overflow-hidden mx-auto w-full h-[180px] md:h-[200px] ">
            <Image
              src={image?.thumbnail ?? productPlaceholder}
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
          <div className="w-full h-full absolute top-0  z-10">
            {discount && (
              <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                {t('text-on-sale')}
              </span>
            )}
            <button
              className="buttons--quickview px-4 py-2 bg-brand-light rounded-full hover:bg-brand hover:text-brand-light"
              aria-label="Quick View Button"
              onClick={handlePopupView}
            >
              <SearchIcon width={iconSize} height={iconSize} opacity="1" />
            </button>
          </div>
        </div>

        <div className="flex flex-col mb-2 h-full overflow-hidden text-center relative">
          <div className="text-sm mt-auto leading-6 text-gray-400 mb-1.5">
            {unit}
          </div>
          <Link
            href={`/${lang}${ROUTES.PRODUCTS}/${slug}`}
            className="text-skin-purple text-sm leading-5 min-h-[40px] line-clamp-2 mb-2 hover:text-brand"
          >
            {name}
          </Link>

          <div className="space-s-2 mb-4 lg:mb-4">
            <span className="inline-block mx-1 text-sm font-medium sm:text-15px lg:text-base text-gray-700">
              {product_type === 'variable'
                ? `${minPrice} - ${maxPrice}`
                : price}
            </span>
            {basePrice && (
              <del className="mx-1 text-sm text-gray-400 text-opacity-70">
                {basePrice}
              </del>
            )}
          </div>
          <div className="inline-block product-cart-button">
            <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
          </div>
        </div>
      </article>
    );
};

export default ProductCardV2;
