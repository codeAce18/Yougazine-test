'use client';

import dynamic from 'next/dynamic';
import { useUI } from '@contexts/ui.context';
import { Drawer } from '@components/common/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import motionProps from '@components/common/drawer/motion';
import { useEffect, useState } from 'react';
import { getToken } from '@framework/utils/get-token';
import { useCart } from '@contexts/cart/cart.context';
const Cart = dynamic(() => import('@components/cart/cart'));
const OrderDetails = dynamic(() => import('@components/order/order-drawer'));

export default function ManagedDrawer({ lang }: { lang: string }) {
  const { displayDrawer, closeDrawer, drawerView } = useUI();
  const dir = getDirection(lang);
  const contentWrapperCSS = dir === 'ltr' ? { right: 0 } : { left: 0 };
  const { addItemToCart, updateCart, getItemFromCart, isInStock, items } = useCart();
  const [cartItems,setCartItmes] = useState<[]>([])

  useEffect(()=>{
    // updateCart();
  },[cartItems])

  useEffect(()=>{
    setCartItmes(items);
  },[items])


  return (
    <Drawer
      rootClassName={
        drawerView === 'ORDER_DETAILS' ? 'order-details-drawer' : ''
      }
      open={displayDrawer}
      placement={dir === 'rtl' ? 'left' : 'right'}
      onClose={closeDrawer}
      // @ts-ignore
      level={null}
      contentWrapperStyle={contentWrapperCSS}
      {...motionProps}
    >
      {drawerView === 'CART_SIDEBAR' && <Cart lang={lang} cartItems={cartItems}/>}
      {drawerView === 'ORDER_DETAILS' && <OrderDetails lang={lang} />}
    </Drawer>
  );
}
