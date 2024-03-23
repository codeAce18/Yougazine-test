
import { Metadata } from 'next';
import CheckoutMainPage from '@components/checkout/checkout-main-page';
import { useUI } from '@contexts/ui.context';
import { useModalAction } from '@components/common/modal/modal.context';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default async function CheckoutPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {


  return (
    <>

        <CheckoutMainPage  lang={lang} />
         
    </>
  );
}
