'use client';

import Link from 'next/link';
import usePrice from '@framework/product/use-price';
import cn from 'classnames';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';
import { useEffect, useState } from 'react';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import { fetchAddress, useAddressQuery } from '@framework/address/address';
import { checkoutOrder } from '@utils/checkout';
import { useUI } from '@contexts/ui.context';
import { Disclosure, Transition } from '@headlessui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useModalAction } from '@components/common/modal/modal.context';

interface CheckoutData {
  promo_code: string;
  "shipping_method": string,
  "shipping_amount": number;
  "shipping_address": string;
  "payment_method": string;
  "project_name": string,
  "event_date": string,
}

const CheckoutCard: React.FC<{ lang: string, selectedCart: any, setSelectedCart: any }> = ({ lang, selectedCart, setSelectedCart }) => {
  const { t } = useTranslation(lang, 'common');
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const { selectedAddress, orderData } = useUI();
  const variant = 'gray';

  useEffect(() => {
    setLoading(false);
  }, []);
  const { items, total, isEmpty } = useCart();

  useEffect(() => {
    if (!selectedCart && items && items.length > 0) {
      console.log(items);
      setSelectedCart(items[0]._id);
    }
  }, [items])


  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });
  let { data: addressData, } = useAddressQuery();

  const formatDate = (param: Date) => {
    let day = param.getDate() < 10 ? '0' + param.getDate() : param.getDate();
    let month = (param.getMonth() + 1);
    let year = param.getFullYear();

    return year + "-" + month + "-" + day;
  }

  const { openModal } = useModalAction();
  async function orderHeader() {
    openModal('PAYMENT');
    // setOrdering(true);
    // const selAddress = addressData.find((a: any) => a._id === selectedAddress);
    // const formattedAddress = `${selAddress.first_name} ${selAddress.last_name}, ${selAddress.address}, ${selAddress.city}, ${selAddress.state}, ${selAddress.country} - ${selAddress.pincode}`
    // let checkoutData: CheckoutData =
    // {
    //   promo_code: "",
    //   shipping_method: "purolator",
    //   shipping_amount: 0,
    //   shipping_address: formattedAddress,
    //   payment_method: "card",
    //   project_name: orderData.projectName,
    //   event_date: formatDate(orderData.eventDate)
    // }

    // await checkoutOrder(checkoutData, setOrdering);

  }
  const checkoutFooter = [
    {
      id: 1,
      name: t('text-sub-total'),
      price: subtotal,
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: '$0',
    },
    {
      id: 3,
      name: t('text-total'),
      price: subtotal,
    },
  ];
  const mounted = useIsMounted();
  return (
    <>

      {isLoading ? (
        <div className="w-full">
          <SearchResultLoader uniqueKey={`product-key`} />
        </div>
      ) : !isEmpty && mounted ? (
        items.map((item, index) => (
          <>
            <div className="flex justify-between w-full px-5 py-4 2xl:px-6 2xl:py-6 ltr:text-left rtl:text-right text-black focus:outline-none bg-[#FBFBFB] accordion__button" onClick={() => setSelectedCart(item._id)}>
              <span
                className={cn(
                  'text-xs leading-relaxed text-heading ltr:pr-2 rtl:pl-2',
                  {
                    'md:text-xs': variant === 'gray',
                    'md:text-xs lg:text-xs': variant === 'transparent',
                  }
                )}
              >
                Cart ID - {item._id}
              </span>
              <MdKeyboardArrowRight
                className={`text-xl lg:text-2xl text-black text-opacity-60 group-hover:text-opacity-100 -mr-2 lg:-mr-1.5 shrink-0 ${selectedCart === item._id ? 'transform rotate-90' : ''
                  }`}
              />
            </div>
            <Transition
              show={selectedCart === item._id}
              enter="transition duration-500 ease-out"
              enterFrom="transform scale-5 opacity-0"
              enterTo="transform scale-10 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-5 opacity-0"
            >
              {selectedCart === item._id && (
                <div className="px-5 pb-4 -mt-1 text-sm leading-7 2xl:pb-7 2xl:px-6 2xl:mt-0 2xl:text-15px text-black opacity-70 bg-white accordion__content">
                  <CheckoutItem item={item} key={item.id} />
                </div>
              )}
            </Transition>
          </>
        ))) : (
        <p className="py-4 text-brand-danger text-opacity-70">
          {t('text-empty-cart')}
        </p>
      )}

      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={`/${lang}${ROUTES.TERMS}`} legacyBehavior>
          <a className="font-medium underline text-brand">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={`/${lang}${ROUTES.PRIVACY}`} legacyBehavior>
          <a className="font-medium underline text-brand">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
      <Text className="mt-4">{t('text-bag-fee')}</Text>
      <Button
        variant="formButton"
        className={cn(
          'w-full mt-8 mb-5 rounded font-semibold px-4 py-3 transition-all',
          mounted && isEmpty
            ? 'opacity-40 cursor-not-allowed'
            : '!bg-brand !text-brand-light'
        )}
        disabled={!selectedAddress || selectedAddress == '' || ordering}
        loading={ordering}
        onClick={orderHeader}
      >
        {t('button-order-now')}
      </Button>
    </>
  );
};

export default CheckoutCard;
