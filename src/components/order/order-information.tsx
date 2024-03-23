"use client";

import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import OrderDetails from '@components/order/order-details';
import { useOrderQuery } from '@framework/order/get-order';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import usePrice from '@framework/product/use-price';
import { useTranslation } from 'src/app/i18n/client';
import { useEffect, useState } from 'react';
import { updatePayment } from '@utils/update-payment';

export default function OrderInformation({ lang }: { lang: string }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || '';
  const sessionId = searchParams.get('session_id') || '';
  const { t } = useTranslation(lang, 'common');
  useEffect(() => {
    const update = async () => {
      const res = await updatePayment(orderId, sessionId);
      console.log(res);
      if (res.success) {
        setData(res.data);
        setIsLoading(false);
      } else {
        setData(res.data);
        setError(res.message);
        setIsLoading(false);
      }
      console.log(data);
    }
    update();
  }, []);
  if (isLoading)
    return (
      <div className="py-16 xl:px-32 2xl:px-44 3xl:px-56 lg:py-20">
        Loading...
      </div>
    );
  return (
    <div className="py-16 xl:px-32 2xl:px-44 3xl:px-56 lg:py-20">
      {
        error == '' && (
          <div className="flex items-center justify-start px-4 py-4 mb-6 text-sm border rounded-md border-border-base bg-brand-tree lg:px-5 text-white md:text-base lg:mb-8">
            <span className="flex items-center justify-center w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 lg:ltr:mr-4 lg:rtl:ml-4 bg-white bg-opacity-20 shrink-0">
              <IoCheckmarkCircle className="w-5 h-5 text-white" />
            </span>
            {t('text-order-received')}
          </div>
        )
      }

      {
        error !== '' && (
          <div className="flex items-center justify-start px-4 py-4 mb-6 text-sm border rounded-md border-border-base bg-brand-danger lg:px-5 text-white md:text-base lg:mb-8">
            <span className="flex items-center justify-center w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 lg:ltr:mr-4 lg:rtl:ml-4 bg-white bg-opacity-20 shrink-0">
              <IoCloseCircle className="w-5 h-5 text-white" />
            </span>
            {t('text-order-error')}
          </div>
        )
      }



      <ul className="flex flex-col border rounded-md border-border-base bg-fill-light md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="px-4 py-4 text-base font-semibold border-b border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r border-border-two lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="block text-xs font-normal leading-5 uppercase text-brand-muted">
            {t('text-order-number')}:
          </span>
          {data?._id}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-status')}:
          </span>
          {data?.status}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-email')}:
          </span>
          {data?.userdata[0]?.email}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-total')}:
          </span>
          ${data?.total_amount}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-payment-method')}:
          </span>
          {data?.payment_method}
        </li>
      </ul>

      <OrderDetails lang={lang} order={data} isLoading={isLoading} />
    </div>
  );
}
