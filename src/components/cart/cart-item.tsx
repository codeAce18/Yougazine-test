import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from '@contexts/cart/cart.context';
import usePrice from '@framework/product/use-price';
import { ROUTES } from '@utils/routes';
import Counter from '@components/ui/counter';
import externaImageLoader from '@utils/external-image-loader';
import { deleteCartItem } from '@utils/delete-cart-item';
import useWindowSize from '@utils/use-window-size';
import { toast } from 'react-toastify';

type CartItemProps = {
  item: any;
  lang: string;
};

const CartItem: React.FC<CartItemProps> = ({ lang, item }) => {
  const { isInStock, updateCart, clearItemFromCart } =
    useCart();

    const { width } = useWindowSize();

  const deleteFromCart = async () => {
    console.log(item);
    await deleteCartItem(item._id);
    await updateCart();
      toast('Removed from the bag', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  return (
    <div
      className={`group w-full h-auto flex justify-start items-center text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0`}
      title={item?.name}
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
       
        <Image
          loader={externaImageLoader}
          src={item?.preview_images}
          width={100}
          height={100}
          loading="eager"
          alt={item.name || 'Product Image'}
          style={{ width: 'auto' }}
          className="object-cover bg-fill-thumbnail"
        />

        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => deleteFromCart()}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="ltr:pl-3 rtl:pr-3 md:ltr:pl-4 md:rtl:pr-4">
          <Link
            href={`/${lang}${ROUTES.PRODUCT}/${item?.slug}`}
            className="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-brand"
          >
            {item?.template_name}
          </Link>
          <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
            {item.category} X {item.quantity}
          </div>
        </div>

        <div className="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
          ${item?.price}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
