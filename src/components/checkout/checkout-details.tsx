'use client';

import { useState } from 'react';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import Contact from '@components/contact/contact';
import Address from './address';
import DeliveryNotes from './delivery-instruction';
import DeliverySchedule from './schedule';
import DeliveryTips from './delivery-tips';
import StripeCheckoutInlineForm from './stripe-checkout-inline-form';
import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { useUI } from '@contexts/ui.context';
import Shippingmethod from './shipping-method';

interface userInterface {
  lang: string;
}

const CheckoutDetails: React.FC<userInterface> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const [bindIndex, setBindIndex] = useState(0);
  const [error, setError] = useState('');
  const {orderData, selectedAddress} = useUI();


  const data = [
    {
      id: 1,
      title: 'text-event-details',
      component: <DeliveryNotes lang={lang} />,
    },
    {
      id: 2,
      title: 'text-delivery-address',
      component: <Address lang={lang} />,
    },
    {
      id: 3,
      title : 'text-shipping-detail',
      component: <Shippingmethod lang={lang}/>
    }
    // {
    //   id: 2,
    //   title: 'text-payment-option',
    //   component: <StripeCheckoutInlineForm  lang={lang} />,
    // },

  ];
  const changeItem = (itemIndex: any) => {
    setBindIndex(itemIndex);
  };
  const mounted = useIsMounted();
  return (
    <div className="border rounded-md text-brand-light">
      {mounted &&
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className={`accordion__panel bg-[#FBFBFB] ${bindIndex !== index ? 'collapsed' : 'expanded'}
            `}
              onClick={() => changeItem(index)}
            >
              <div
                id={`index_${index}`}
                className="flex items-center p-4 pb-6 cursor-pointer sm:p-8 bg-[#FBFBFB] accordion__button"
              >
                <span className="flex items-center justify-center font-semibold border-2 border-brand-dark rounded-full h-9 w-9 text-brand-dark ltr:mr-3 rtl:ml-3">
                  {index + 1}
                </span>
                <h3 className='text-black text-sm font-bold'>{t(item?.title)}</h3>
              </div>

              
              <div
                data-aria-label={`index_${index}`}
                className="bg-white mb-4 pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-9 sm:rtl:pr-9 lg:ltr:pl-20 lg:rtl:pr-20 sm:ltr:pr-9 sm:rtl:pl-9 ltr:pr-5 rtl:pl-5 accordion__content"
              >
                {
                error !== '' && (
                  <div className="flex items-center justify-start px-4 py-4 mb-4 text-sm border rounded-md border-border-base bg-brand-danger lg:px-5 text-white md:text-base lg:mb-8">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 lg:ltr:mr-4 lg:rtl:ml-4 bg-white bg-opacity-20 shrink-0">
                      <IoCloseCircle className="w-5 h-5 text-white" />
                    </span>
                    {error}
                  </div>
                )
              }
                <div className="mb-6">{item?.component}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CheckoutDetails;
