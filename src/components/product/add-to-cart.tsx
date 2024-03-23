import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import PlusIcon from '@components/icons/plus-icon';
import useWindowSize from '@utils/use-window-size';
import { useTranslation } from 'src/app/i18n/client';
import Link from 'next/link';
import { AiOutlineAppstoreAdd, AiOutlineDashboard, AiOutlineEye } from 'react-icons/ai';
import { GrDiamond } from 'react-icons/gr';
import { ROUTES } from '@utils/routes';

interface Props {
  lang: string;
  data: any;
  variation?: any;
  disabled?: boolean;
  variant?: any;
  slug?: string;
}
const AddToCart = ({
  lang,
  data,
  variation,
  disabled,
  variant = 'mercury',
  slug
}: Props) => {
  const { width } = useWindowSize();
  const { t } = useTranslation(lang, 'common');
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const iconSize = width! > 480 ? '19' : '17';

  return (
    <div className="flex w-full flex-nowrap">
      <Link
        className="w-full min-w-[100px]  py-3 bg-brand text-brand-light text-[12px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        href={`/${lang}${ROUTES.PRODUCTS}/${data.slug}`}
      >
        <div className="flex justify-center items-center">
          <AiOutlineAppstoreAdd className='mr-2 text-[15px]' />
          {t('text-customize')}
        </div>
      </Link>
      <Link
        className="w-full min-w-[100px]  py-3 bg-brand-secondary text-brand-light text-[12px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        href={`/${lang}${ROUTES.PREVIEW}/${data.slug}`}
      >
        <div className="flex justify-center items-center">
          <AiOutlineEye className='mr-2 text-[15px]'/>
          {t('text-quick-view')}
        </div>
      </Link>
    </div>
  )
};

export default AddToCart;
