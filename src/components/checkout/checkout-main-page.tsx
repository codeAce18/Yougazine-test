'use client'
import CheckoutCard from '@components/checkout/checkout-card';
import Container from '@components/ui/container';
import CheckoutDetails from '@components/checkout/checkout-details';
import Divider from '@components/ui/divider';

import { useEffect, useState } from 'react';
import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';



interface Props{
    lang:string;
}

const CheckoutMainPage:React.FC<Props>=({lang})=> {


    const { openModal, closeModal } = useModalAction();
    const {isAuthorized} = useUI();
    const [selectedCart, setSelectedCart] = useState();
  
    useEffect(() => {
      console.log(selectedCart);
    }, [selectedCart]);
    if(!isAuthorized) {
      openModal('LOGIN_VIEW');
    } 
  return (
    <>
      <Container className="pt-10 2xl:pt-12 checkout">
        <div className="flex flex-col mx-auto bg-[#F9F9F9] p-6 rounded-xl">
          <div className="flex flex-col lg:grid lg:grid-cols-12 grid-cols-1 flex-wrap gap-8">
            <div className="w-full col-start-1 col-end-10">
              <CheckoutDetails  lang={lang} />
            </div>
            <div className="w-full mt-7 lg:mt-0 col-start-10 col-end-13">
              <CheckoutCard selectedCart={selectedCart} setSelectedCart={setSelectedCart}  lang={lang} />
            </div>
          </div>
        </div>
      </Container>
      <Divider />
    </>
  );
}

export default  CheckoutMainPage;
