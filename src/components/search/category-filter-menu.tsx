import { usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'src/app/i18n/client';
import { FaCheck } from 'react-icons/fa';
import useQueryParam from '@utils/use-query-params';
import { SwiperSlide } from 'swiper/react';
import Carousel from '@components/ui/carousel/carousel';
import { BsTriangleFill } from "react-icons/bs";

const externaImageLoader = ({ src }: { src: string }) =>
  `https://d2qs6wfbkerq2c.cloudfront.net/${src}`;

const breakpoints = {
  '1536': {
    slidesPerView: 10,
  },
  '1280': {
    slidesPerView: 8,
  },
  '1024': {
    slidesPerView: 6,
  },
  '640': {
    slidesPerView: 4,
  },
  '360': {
    slidesPerView: 3,
  },
  '0': {
    slidesPerView: 3,
  },
};

function checkIsActive(arr: any, item: string) {
  if(item == 'all' && arr.length == 0) {
    return true;
  } else if (arr.includes(item)) {
    return true;
  }
  return false;
}
function CategoryFilterMenuItem({
  className = 'border-t border-border-base first:border-t-0  py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  depth = 0,
  lang,
}: any) {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string[]>([]);

  const isActive =
    checkIsActive(formState, item.slug) ||
    item?.children?.some((_item: any) => checkIsActive(formState, _item.slug));
  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [subItemAction, setSubItemAction] = useState<boolean>(false);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, name, children: items, icon_image } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  const handleChange = () => {
    setSubItemAction(!subItemAction);
  };

  const hasQueryKey = searchParams?.get('category');

  useEffect(() => {
    updateQueryparams('category', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(',') ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      setFormState(
        [slug]
      );

      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
    );
  }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          'flex justify-between items-center transition text-sm ',
          { 'text-brand-secondary': isOpen },
          className
        )}
      >
        <button
          className={cn(
            'text-white hover:text-brand-secondary relative flex flex-col items-center w-full ltr:text-left rtl:text-right cursor-pointer group gap-2',
            { 'py-2': depth > 0 }
          )}
        // onClick={handleChange}
        >
          {icon_image && (
            <div className="rounded-full bg-white p-4 w-[60px] h-[60px]">
              <Image
                loader={icon_image ? externaImageLoader : undefined}
                src={icon_image ?? '/assets/placeholder/category-small.svg'}
                alt={name || t('text-category-thumbnail')}
                width={500}
                height={500}
                style={{ width: 'auto', height: '30px', margin: 'auto' }}
              />
            </div>
          )}
          {depth > 0 && (
            <span
              className={`w-[20px] h-[20px] text-[11px] flex items-center justify-center border-2 border-border-four rounded-full transition duration-500 ease-in-out group-hover:border-yellow-100 text-brand-light ${formState.includes(item.slug) &&
                'border-yellow-100 bg-yellow-100'
                }`}
            >
              {formState.includes(item.slug) && <FaCheck />}
            </span>
          )}
          <span className="uppercase font-semibold py-0.5">{name}</span>

          {expandIcon && (
            <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
          )}
          {
            isActive && (
              <div className="absolute bottom-[-20px] text-white w-fulltext-center">
            <BsTriangleFill className='m-auto text-2xl' />
          </div>
            )
          }
        </button>

      </li>
      {Array.isArray(items) && isOpen ? (
        <li>
          <ul key="content" className="text-xs pb-4">
            {items?.map((currentItem: any) => {
              const childDepth = depth + 1;
              return (
                <CategoryFilterMenuItem
                  key={`${currentItem.name}${currentItem.slug}`}
                  item={currentItem}
                  depth={childDepth}
                  className="px-0 border-b-0 "
                  lang={lang}
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function CategoryFilterMenu({ items, className, lang }: any) {
  const uniqueKey = "category-filter"
  return (
    <Carousel
      grid={{ rows: 1, fill: 'row' }}
      breakpoints={breakpoints}
      className="catslider text-center"
      prevButtonClassName="start-3  -top-12 3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
      nextButtonClassName={`end-3 -top-12 3xl:top-auto transform 2xl:translate-x-0 3xl:-translate-y-2 ${'xl:translate-x-2.5'
        }`}
      lang={lang}
    >
      <SwiperSlide
        key={`${uniqueKey}-${'-1'}`}
        className="px-1.5 md:px-2 xl:px-2.5 py-1 w-60"
      >
        <CategoryFilterMenuItem
          key={`${'all'}-swiper-${'all'}`}
          item={{ name: 'All', slug: 'all', icon_image: 'category/allcat.png' }}
          lang={lang}
        />
      </SwiperSlide>
      {items?.map((item: any, idx: number) => (
        <SwiperSlide
          key={`${uniqueKey}-${idx}`}
          className="px-1.5 md:px-2 xl:px-2.5 py-1 w-60"
        >
          <CategoryFilterMenuItem
            key={`${item.slug}-key-${item.id}`}
            icon={item.icon_image}
            item={item}
            lang={lang}
          />
        </SwiperSlide>
      ))}
    </Carousel>
  );
}

export default CategoryFilterMenu;
