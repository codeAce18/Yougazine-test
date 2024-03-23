import { OrderDetailsContent } from './order-details-content';
import { formatAddress } from '@utils/format-address';
import Heading from '@components/ui/heading';
import { IoClose } from 'react-icons/io5';
import OrderStatus from './order-status';
import {
  DiscountPrice,
  DeliveryFee,
  TotalPrice,
  SubTotalPrice,
} from '@components/order/price';

import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'src/app/i18n/client';

const OrderDrawer: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const { data, closeDrawer } = useUI();
  let { shipping_address } = data;
  console.log(data);

  return (
    <>
      {data !== '' && (
        <>
          <div className="block">
            <div className="relative flex items-center justify-between w-full border-b ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 border-border-base">
              <Heading variant="titleMedium">
                {t('text-order-details')}:
              </Heading>
              <button
                className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-6 lg:py-7 focus:outline-none text-brand-dark hover:opacity-60"
                onClick={closeDrawer}
                aria-label="close"
              >
                <IoClose />
              </button>
            </div>
            <div className="p-5 md:p-8">
              <div className="text-[14px] opacity-70 mb-3 text-brand-dark">
                {t('text-delivery-address')}
              </div>
              <div className="rounded border border-solid min-h-[90px] bg-gray-200 p-4 border-border-two text-[12px] md:text-[14px]">
                <p className="text-brand-dark opacity-70">
                  {shipping_address}
                </p>
              </div>
              <OrderStatus status={data?.status} />
              <div className="grid grid-cols-12 bg-fill-base py-3 rounded-[3px] text-brand-light/70 text-[12px] md:text-[14px]">
                <div className="col-span-2"></div>
                <div className="col-span-8">Item</div>
                <div className="col-span-2">Price</div>
              </div>
              {data?.order_items?.map((item: any, index: string) => (
                <OrderDetailsContent key={index} item={item} />
              ))}
              <div className="mt-3 ltr:text-right rtl:text-left">
                <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
                  <div className="pb-1 mb-2 border-b border-border-base ltr:pl-20 rtl:pr-20">
                    <p className="flex justify-between mb-1">
                      <span className="ltr:mr-8 rtl:ml-8">Sub total: </span>
                      <span className="font-medium">
                        <SubTotalPrice items={data?.order_items} />
                      </span>
                    </p>
                    {typeof data?.promo_code_discount === 'number' && (
                      <p className="flex justify-between mb-2">
                        <span className="ltr:mr-8 rtl:ml-8">Discount: </span>
                        <span className="font-medium">
                          <DiscountPrice discount={data?.promo_code_discount} />
                        </span>
                      </p>
                    )}
                    {typeof data?.shipping_amount === 'number' && (
                      <p className="flex justify-between mb-2">
                        <span className="ltr:mr-8 rtl:ml-8">Delivery Fee:</span>
                        <span className="font-medium">
                          <DeliveryFee delivery={data?.shipping_amount} />
                        </span>
                      </p>
                    )}
                  </div>
                  <p className="flex justify-between mb-2 ltr:pl-20 rtl:pr-20">
                    <span className="ltr:mr-8 rtl:ml-8">Total Cost:</span>
                    <span className="font-medium">
                      <TotalPrice items={data} />
                    </span>
                  </p>
                </div>
              </div>
              {/* <div className="mt-12 ltr:text-right rtl:text-left">
                <span
                  onClick={closeDrawer}
                  className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-white font-medium bg-brand rounded border border-solid border-brand-secondary  hover:bg-white hover:text-black hover:border-[#DEE5EA] transition-all capitalize"
                >
                  Cancel order
                </span>
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDrawer;
