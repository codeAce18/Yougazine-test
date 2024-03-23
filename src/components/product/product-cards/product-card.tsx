import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Price, Product } from '@framework/types';
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
import { FaStar } from 'react-icons/fa';

const externaImageLoader = ({ src }: { src: string }) =>
    `https://d2qs6wfbkerq2c.cloudfront.net/${src}`;

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
    const { _id, quantity, product_type } = data ?? {};
    const { width } = useWindowSize();
    const { openModal } = useModalAction();
    const { isInCart, isInStock } = useCart();
    const iconSize = width! > 1024 ? '19' : '17';
    const outOfStock = isInCart(_id)

    function handlePopupView() {
        openModal('PRODUCT_VIEW', data);
    }

    // if (outOfStock) {
    //     return (
    //         <span
    //             className="w-full text-[11px] md:text-xs font-medium text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
    //             {t('text-out-stock')}
    //         </span>
    //     );
    // }
    return (
        <AddToCart data={data} variant="mercury" lang={lang} />
    );
}

const ProductCard: React.FC<ProductProps> = ({ product, className, lang }) => {
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
        amount: product.prices.length > 0 ? (product?.prices?.sort((a: Price, b: Price) => a.price - b.price)[0].price ?? 0) : 0,
        currencyCode: 'USD',
    });
    const { price: maxPrice } = usePrice({
        amount: product.prices.length > 0 ? (product?.prices?.sort((a: Price, b: Price) => b.price - a.price)[0].price ?? 0) : 0,
        currencyCode: 'USD',
    });

    function handlePopupView() {
        openModal('PRODUCT_VIEW', product);
    }
    return (
        <article
            className={cn(
                'flex flex-col product-card relative h-full shadow-xl',
                className
            )}
            title={product.name}
        >
            <div className='relative'>
                <div className="relative flex-shrink-0 overflow-hidden prodimg">
                    <div className="relative card-img-container overflow-hidden mx-auto w-full">
                        <Link className='w-full' href={`/${lang}/get-started/template-detail?slug=${product.slug}`}>
                            <Image
                                loader={product.preview_images.length > 0 ? externaImageLoader : undefined}
                                src={product.preview_images.length > 0 ? `${product.preview_images[0].image}` : productPlaceholder}
                                alt={product.name || 'Product Image'}
                                quality={100}
                                width={0}
                                height={0}
                                sizes="100%"
                                priority
                                className="w-full h-auto object-cover bg-fill-thumbnail"
                            />
                        </Link>
                    </div>
                    {/* <div className="w-full h-full absolute top-0  z-10">
                    {discount && (
                        <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] m-2">
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
                </div> */}

                </div>
                {/* <div className="inline-block product-cart-button w-full">
                <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
            </div> */}
                <div className="flex flex-col mb-1 mt-1 ml-2 h-full overflow-hidden relative">
                    <Link
                        href={`/${lang}/get-started/template-detail?slug=${product.slug}`}
                        className="text-skin-purple text-sm leading-5 line-clamp-2 mb-2 hover:text-brand"
                    >
                        {product.name}
                    </Link>

                    <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-skin">{product.category[0]?.name}</span>
                        <span className='flex text-green-600 text-sm pr-2'><FaStar className='mt-0.5' /> 4.5<span className='text-black'>(4723+)</span></span>
                    </div>

                    {/* <div className="space-s-2">
                    <span className="inline-block mx-1 text-sm font-medium sm:text-15px lg:text-base text-brand">
                        {product.prices.length > 1 ? `${minPrice} - ${maxPrice}` : `$${product.prices[0]?.price ?? 0}`}
                    </span>
                    {basePrice && (
                        <del className="mx-1 text-sm text-brand-secondary text-opacity-70">
                            {basePrice}
                        </del>
                    )}
                </div> */}

                </div>
                {/* <div className='absolute right-[100%] max-w-[300px] w-full flex flex-col'>
                    <Image
                        loader={product.preview_images.length > 0 ? externaImageLoader : undefined}
                        src={product.preview_images.length > 0 ? `${product.preview_images[0].image}` : productPlaceholder}
                        alt={product.name || 'Product Image'}
                        quality={100}
                        width={0}
                        height={0}
                        sizes="100%"
                        priority
                        className="w-full h-auto object-cover bg-fill-thumbnail"
                    />
                </div> */}
            </div>
        </article >
    );
};

export default ProductCard;
