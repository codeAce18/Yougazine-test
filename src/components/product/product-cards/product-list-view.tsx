import cn from 'classnames';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import usePrice from '@framework/product/use-price';
import {Price, Product} from '@framework/types';
import {useModalAction} from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import SearchIcon from '@components/icons/search-icon';
import {useCart} from '@contexts/cart/cart.context';
import {useTranslation} from 'src/app/i18n/client';
import {productPlaceholder} from '@assets/placeholders';
import {ROUTES} from "@utils/routes";
import dynamic from "next/dynamic";
import externaImageLoader from '@utils/external-image-loader';

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
    ssr: false,
});

interface ProductProps {
    lang?: string;
    product: Product;
    className?: string;
}

function RenderPopupOrAddToCart({props}: { props: Object }) {
    let {data, lang}: any = props;
    const {t} = useTranslation(lang, 'common');
    const {id, quantity, product_type} = data ?? {};
    const {width} = useWindowSize();
    const {openModal} = useModalAction();
    const {isInCart, isInStock} = useCart();
    const inCart = isInCart(id);
    
    function handlePopupView() {
        openModal('PRODUCT_VIEW', data);
    }
    if (inCart) {
        return (
            <span
                className="text-[11px] text-skin-inverted uppercase inline-block bg-skin-red rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-in-cart')}
      </span>
        );
    }
    if (product_type === 'variable') {
        return (
            <button
                className="min-w-[150px] px-4 py-2 bg-skin-primary text-skin-inverted text-[14px] items-center justify-center focus:outline-none focus-visible:outline-none"
                aria-label="Count Button"
                onClick={handlePopupView}
            >
                {t('text-product-details')}
            </button>
        );
    }
    return <AddToCart data={data} lang={lang}/>;
}

const ProductList: React.FC<ProductProps> = ({product, className, lang}) => {
    const {name, preview_images, category, slug, product_type, short_description} = product ?? {};
    const {openModal} = useModalAction();
    const {t} = useTranslation(lang || 'en', 'common');
    const {width} = useWindowSize();
    const iconSize = width! > 1024 ? '20' : '17';
    const {price, basePrice, discount} = usePrice({
        amount: (product?.sale_price ? product?.sale_price : product?.price) as number,
        baseAmount: product?.price as number,
        currencyCode: 'USD',
    });
    const { price: minPrice } = usePrice({
        amount: product.prices.length > 0 ? (product?.prices?.sort((a: Price,b: Price) => a.price - b.price)[0].price ?? 0) : 0,
        currencyCode: 'USD',
    });
    const { price: maxPrice } = usePrice({
        amount: product.prices.length > 0 ? (product?.prices?.sort((a: Price,b: Price) => b.price - a.price)[0].price ?? 0) : 0,
        currencyCode: 'USD',
    });
    
    function handlePopupView() {
        openModal('PRODUCT_VIEW', product);
    }
    
    return (
        <article
            className={cn(
                ' product-list-view overflow-hidden relative  grid grid-cols-4  gap-8',
                className
            )}
            title={name}
        >
            <div className="col-span-1 ">
                <Link
                    href={`/${lang}/get-started/template-detail/${slug}`}
                    className="block border border-black/10 hover:border-skin-primary"
                >    
                    <div
                        className="relative card-img-container overflow-hidden mx-auto w-full h-[180px] md:h-[300px] ">
                        <Image
                            loader={externaImageLoader}
                            src={product.preview_images.length > 0 ? `${product.preview_images[0].image}` : productPlaceholder}
                            alt={name || 'Template Image'}
                            quality={100}
                            priority
                            fill
            //                 sizes="(max-width: 768px) 100vw,
            //   (max-width: 1200px) 50vw,
            //   33vw"
                            className="object-cover bg-fill-thumbnail"
                        />
                    </div>
                </Link>
            </div>
            
            <div className="col-span-3">
                <div className="text-12px sm:text-sm mt-auto text-gray-400 mb-2">{category[0]?.name}</div>
                <Link
                    href={`/${lang}/get-started/template-detail/${slug}`}
                    className="text-skin-base text-base font-semibold leading-5 min-h-[30px] line-clamp-2 mb-1.5 hover:text-skin-primary"
                >
                    {name}
                </Link>
                
                <div className="space-s-2 mb-2">
          <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
            {product.prices.length > 1 ? `${minPrice} - ${maxPrice}` : product.prices[0].price}
          </span>
                    {basePrice && (
                        <del className="text-sm text-gray-400 text-opacity-70">
                            {basePrice}
                        </del>
                    )}
                </div>
                <p className="text-sm text-skin-base line-clamp-3 leading-6 text-opacity-80" dangerouslySetInnerHTML={{__html: short_description}}>
                    
                </p>
                <div className="inline-block product-cart-button mt-6 min-w-[300px]">
                    <RenderPopupOrAddToCart props={{data: product, lang: lang}}/>
                
                </div>
            
            </div>
        </article>
    );
};

export default ProductList;
