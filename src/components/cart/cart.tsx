import Scrollbar from '@components/ui/scrollbar';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import usePrice from '@framework/product/use-price';
import { IoClose } from 'react-icons/io5';
import CartItem from './cart-item';
import EmptyCart from './empty-cart';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import DeleteIcon from '@components/icons/delete-icon';
import { useTranslation } from 'src/app/i18n/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '@framework/utils/get-token';
import { clearCart } from '@utils/clear-cart';

type CartProps = {
  lang: string;
  cartItems?: [];
};

export default function Cart({lang,cartItems}:CartProps) {
  const { t } = useTranslation(lang, 'common');
  const { closeDrawer } = useUI();
  const { items, total, isEmpty, updateCart } = useCart();
  const [cartPrice,setCartPrice] = useState<number>()
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });

 useEffect(()=>{
  const cartTotalPrice  = cartItems.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);
  setCartPrice(cartTotalPrice)
 },[cartItems])



  
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="relative flex items-center justify-between w-full border-b ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 border-border-base">
        <Heading variant="titleMedium">{t('text-shopping-cart')}</Heading>
        <div className="flex items-center">
          {!isEmpty && (
            // @ts-ignore
            <button
              className="flex flex-shrink items-center text-15px transition duration-150 ease-in focus:outline-none text-brand-dark opacity-50 hover:opacity-100 ltr:-mr-1.5 rtl:-ml-1.5"
              aria-label={t('text-clear-all')}
              onClick={()=>{clearCart(updateCart)}}
            >
              <DeleteIcon />
              <span className="ltr:pl-1 lg:rtl:pr-1">
                {t('text-clear-all')}
              </span>
            </button>
          )}

          <button
            className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-6 lg:py-7 focus:outline-none text-brand-dark hover:opacity-60"
            onClick={closeDrawer}
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      </div>
      {cartItems.length>0 ? (
        <Scrollbar className="flex-grow w-full cart-scrollbar ">
          <div className="w-full px-5 md:px-7 h-[calc(100vh_-_300px)]">
            {cartItems?.map((item) => (
              <CartItem item={item} key={item._id} lang={lang} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <EmptyCart lang={lang} />
      )}
      <div className="px-5 pt-5 pb-5 border-t border-border-base md:px-7 md:pt-6 md:pb-6">
        <div className="flex pb-5 md:pb-7">
          <div className="ltr:pr-3 rtl:pl-3">
            <Heading className="mb-2.5">{t('text-sub-total')}:</Heading>
            <Text className="leading-6">
              {t('text-cart-final-price-discount')}
            </Text>
          </div>
          <div className="shrink-0 font-semibold text-base md:text-lg text-brand-dark -mt-0.5 min-w-[80px] ltr:text-right rtl:text-left">
            ${cartPrice}
          </div>
        </div>
        <div className="flex flex-col" onClick={closeDrawer}>
          <Link
            href={isEmpty === false ? `/${lang}${ROUTES.CHECKOUT}` : `/${lang}`}
            className={cn(
              'w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-brand-light bg-brand focus:outline-none transition duration-300 hover:bg-opacity-90',
              {
                'cursor-not-allowed !text-brand-dark !text-opacity-25 bg-fill-four hover:bg-fill-four':
                  isEmpty,
              }
            )}
          >
            <span className="py-0.5">{t('text-proceed-to-checkout')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
