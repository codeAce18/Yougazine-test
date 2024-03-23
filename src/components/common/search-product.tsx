import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';
import usePrice from "@framework/product/use-price";
import externaImageLoader from '@utils/external-image-loader';

type SearchProductProps = {
  lang: string;
  item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ lang, item }) => {
  const { name, preview_images, unit, slug, product_type } = item ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: item?.sale_price ? item?.sale_price : item?.price,
    baseAmount: item?.price,
    currencyCode: 'USD',
  });
  const { price: minPrice } = usePrice({
    amount: item?.prices[0].price ?? 0,
    currencyCode: 'USD',
  });
  const { price: maxPrice } = usePrice({
    amount: item?.prices[item.prices.length - 1].price ?? 0,
    currencyCode: 'USD',
  });
  

  return (
    <Link
      href={`/${lang}${ROUTES.PRODUCT}/${item?.slug}`}
      className="flex items-center justify-start w-full h-auto group"
    >
      <div className="relative flex w-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
        <Image
        loader={externaImageLoader}
          src={preview_images[0].image ?? searchProductPlaceholder}
          width={70}
          height={70}
          alt={name || 'Product Image'}
          className="object-cover bg-fill-thumbnail"
          style={{ width: 'auto' }}
        />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-skin-base text-15px  mb-1.5">{name}</h3>
        <div className="space-x-2 ">
          <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
            {item.prices.length > 1 ? `${minPrice} - ${maxPrice}` : item.prices[0].price}
          </span>
          {basePrice && (
            <del className="text-sm text-skin-base text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchProduct;
