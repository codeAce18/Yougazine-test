'use client';

import { useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useParams } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { useProductQuery } from '@framework/product/get-product';
import { getVariations } from '@framework/utils/get-variations';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import ProductDetailsTab from '@components/product/product-details/product-tab';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'src/app/i18n/client';
import ProductPricing from './product-pricing';
import { getToken } from '@framework/utils/get-token';
import { useUI } from '@contexts/ui.context';
import { useModalAction } from '@components/common/modal/modal.context';
import { wishlist } from '@utils/wishlist';

const ProductSingleDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const {isAuthorized} = useUI();
  const { openModal } = useModalAction();
  const pathname = useParams();
  const { slug } = pathname;
  const { width } = useWindowSize();
  const { data, isLoading } = useProductQuery(slug as string);
  const { isInCart, updateCart } = useCart();
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${lang}${ROUTES.PRODUCT}/${pathname.slug}`;

  const [indexNum, setIndexNUm] = useState(-1)
  const [cartPriceDesc, setCartPriceDesc] = useState<any[]>([])
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  if (isLoading) return <p className={"pt-8 pb-8"}>Loading...</p>;

  // const isSelected = !isEmpty(data?.prices)
  //   ? !isEmpty(attributes) &&
  //   Object.keys(data.prices).every((variation) =>
  //     attributes.hasOwnProperty(variation)
  //   )
  //   : true;
  // let selectedVariation: any = {};
  // if (isSelected) {
  //   const dataVaiOption: any = data?.variation_options;
  //   selectedVariation = dataVaiOption?.find((o: any) =>
  //     isEqual(
  //       o.options.map((v: any) => v.value).sort(),
  //       Object.values(attributes).sort()
  //     )
  //   );
  // }
  const inCart = isInCart(data?._id);
  const addToCart = async () => {
    if(!isAuthorized) {
      openModal('LOGIN_VIEW');
      return
    } else {
      setAddToCartLoader(true);
      const res = await generateCartItem(data?._id, "", cartPriceDesc?._id);
      console.log(res);
      await updateCart();
      setAddToCartLoader(false);
      if(res.success) {
        toast('Added to the bag', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast('Incorrect Selections!! Kindly check', {
          className: 'danger',
          progressClassName: 'danger',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }
  function addToWishlist() {
    // to show btn feedback while product wishlist
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    wishlist(data?._id)
    console.log("DATAID",data?._id)
    toast(toastStatus, {
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
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        <div className="col-span-6 mb-6 overflow-hidden  md:mb-8 lg:mb-0 lg:sticky self-start top-[65px]">
          <ThumbnailCarousel
            gallery={data?.preview_images}
            thumbnailClassName="xl:w-[700px] 2xl:w-[880px]"
            galleryClassName="xl:w-[300px] 2xl:w-[350px]"
            lang={lang}
          />
        </div>

        <div className="flex flex-col col-span-4 shrink-0 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-4 lg:pb-8">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                {data?.name}
              </h2>

            </div>
            {data?.category.length ? (
              <div className="text-sm font-medium md:text-15px">
                {data?.category[0]?.name}

                <div className='mt-1 flex'>
                  <h2 className="text-lg font-medium duration-300 text-brand-dark md:text-xl xl:text-2xl">
                    {indexNum >= 0 ? " $" + data?.prices[indexNum].price : `$${data?.prices[0].price} - $${data?.prices[data?.prices.length - 1].price}`}
                  </h2>
                </div>
              </div>
            ) : (
              <></>
              // <VariationPrice
              //   selectedVariation={selectedVariation}
              //   minPrice={data?.min_price}
              //   maxPrice={data?.max_price}
              //   lang={lang}
              // />
            )}
          </div>

          <div dangerouslySetInnerHTML={{ __html: data?.short_description || '' }}></div>

          <ProductPricing setCartPriceDesc={setCartPriceDesc} key={`product-pricing-${data?._id}`} prices={data?.prices} indexNum={indexNum} setIndexNUm={setIndexNUm} attributes={attributes} setAttributes={setAttributes} />
          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            <Button
              onClick={addToCart}
              className="w-full px-1.5 rounded-full"
              disabled={(indexNum < 0 || addToCartLoader || inCart) ? true : false}
              loading={addToCartLoader}
            >
              <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
              {!inCart ? t('text-add-to-cart') : t('text-already-in-cart')}
            </Button>
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="border"
                disabled = {!cartPriceDesc?true:false}
                onClick={addToWishlist}
                loading={addToWishlistLoader}
                className={`group hover:text-brand ${favorite === true && 'text-brand'
                  } rounded-full`}
              >
                {favorite === true ? (
                  <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all" />
                ) : (
                  <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                )}

                {t('text-wishlist')}
              </Button>
              <div className="relative group">
                <Button
                  variant="border"
                  className={`w-full hover:text-brand ${shareButtonStatus === true && 'text-brand'
                    } rounded-full`}
                  onClick={handleChange}
                >
                  <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                  {t('text-share')}
                </Button>
                <SocialShareBox
                  className={`absolute z-10 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${shareButtonStatus === true
                    ? 'visible opacity-100 top-full'
                    : 'opacity-0 invisible top-[130%]'
                    }`}
                  shareUrl={productUrl}
                  lang={lang}
                />
              </div>
            </div>
          </div>
          {data?.tag && (
            <ul className="pt-5 xl:pt-6">
              <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                <LabelIcon className="ltr:mr-2 rtl:ml-2" /> {t('text-tags')}:
              </li>
              {data?.tag?.map((item: any) => (
                <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                  <TagLabel data={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ProductDetailsTab template={data?._id} details={data?.details} image={data?.preview_images[0].image} lang={lang} />
    </div>
  );
};

export default ProductSingleDetails;
