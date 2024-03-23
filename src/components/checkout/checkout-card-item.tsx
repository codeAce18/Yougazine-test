"use client";

import { Item } from '@contexts/cart/cart.utils';
import Image from '@components/ui/image';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import usePrice from '@framework/product/use-price';
import { useProductByIdQuery } from '@framework/product/get-product-by-id';
import { productPlaceholder } from '@assets/placeholders';
import ProductPricing from '@components/product/product-pricing';
import Divider from '@components/ui/divider';
import CheckoutPricing from '@components/product/checkout-pricing';
import { useState } from 'react';



const externaImageLoader = ({ src }: { src: string }) =>
  `https://d2qs6wfbkerq2c.cloudfront.net/${src}`;

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.price,
    currencyCode: 'USD',
  });
  //const { data, isLoading } = useProductByIdQuery(item.template_id);
  const [priceId, setPriceId] = useState(item.price_id);
  console.log(item.preview_images);
  return (
    <div className="flex flex-col py-4 border-b border-border-base">
      <div className='flex'>
        <Image
          loader={item.preview_images ? externaImageLoader : undefined}
          src={item.preview_images ? item.preview_images : productPlaceholder}
          alt={item?.template_name || 'Product Image'}
          quality={100}
          width={0}
          height={0}
          sizes="100%"
          priority
          className="w-full h-auto object-cover bg-fill-thumbnail max-w-[60px]"
        />
        <div className='flex flex-col ltr:pl-3 rtl:pr-3 '>
          <h1 className="text-sm text-brand-secondary font-bold">
            {item.template_name}
          </h1>
          <div className='flex justify-between'>
            <h6 className='text-xs text-gray-500'>Size: {item?.size}</h6>
            <button className='text-xs text-brand'>remove</button>
          </div>
          <div className="flex ltr:ml-auto rtl:mr-auto text-15px text-black font-bold text-sm ltr:pl-2 rtl:pr-2 shrink-0">
          {price}
        </div>
        </div>
      </div>
      <CheckoutPricing key={`product-pricing-${item?.template_id}`} prices={item.prices} priceId={priceId} setPriceId={setPriceId} templateId={item?.template_id} />
    </div>
  );
};
