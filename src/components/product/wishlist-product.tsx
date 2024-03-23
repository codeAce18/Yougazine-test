import WishlistProductCard from '@components/product/wishlist-product-card';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';

interface ProductWishlistProps {
  className?: string;
  lang: string;
}

export default function ProductWishlistGrid({
  className = '',
  lang,
}: ProductWishlistProps) {
  const limit = 35;
  const { data, isLoading, error } = useWishlistProductsQuery({
    limit: limit,
  });
  
  
  
  
  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="flex flex-col">
          {isLoading
            ? Array.from({ length: 35 }).map((_, idx) => (
                <ProductCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              ))
            : data?.map((product: any) => (
                <WishlistProductCard
                  key={`product--key${product.id}`}
                  product={product}
                  lang={lang}
                />
              ))}
        </div>
      )}
    </div>
  );
}
