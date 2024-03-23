import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'src/app/i18n/client';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { getToken } from '@framework/utils/get-token';

type CartButtonProps = {
  lang: string;
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
  // isShowing?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  lang,
  className,
  iconClassName = 'text-brand-dark',
  hideLabel,
  // isShowing,
}) => {
  const { t } = useTranslation(lang, 'common');
  const {isAuthorized} = useUI();
  const { openDrawer, setDrawerView } = useUI();
  const { totalItems, updateCart, items } = useCart();
  const [cartItems,setCartItmes] = useState([])

  function handleCartOpen() {
    setDrawerView('CART_SIDEBAR');
    return openDrawer();

  }
  useEffect(()=>{
    updateCart();
  },[]);

  useEffect(()=>{
    setCartItmes(items);
  },[items])

  return (
    <button
      className={cn(
        'flex items-center justify-center shrink-0 h-auto focus:outline-none transform',
        className
      )}
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <div className="relative flex items-center">
        <div className='flex items-center relative cart-button'>
            <CartIcon className={cn(iconClassName)} />
            <span className="cart-counter-badge  min-w-[20px] min-h-[20px] p-0.5 rounded-[20px] flex items-center justify-center bg-brand text-brand-light absolute top-1 ltr:right-5 rtl:left-5 text-10px">
          {  isAuthorized && cartItems.length ?   cartItems.length :"0"}
        </span>
        </div>
        {!hideLabel && (
        <span className="text-sm font-normal text-brand-secondary ltr:ml-2 rtl:mr-2">
          {t('text-cart')}
        </span>
      )}
      
      </div>
     
    </button>
  );
};

export default CartButton;
