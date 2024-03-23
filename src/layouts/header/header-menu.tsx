import Link from '@components/ui/link';
import { FaChevronDown } from 'react-icons/fa';
import {BsChevronDown} from 'react-icons/bs';
import ListMenu from '@components/ui/list-menu';
import SubMega from '@components/ui/mega/sub-mega';
import cn from 'classnames';
import { useTranslation } from 'src/app/i18n/client';
import { useState } from 'react';

interface MenuProps {
  lang: string;
  data: any;
  className?: string;
  bgPrimary?: boolean;
}

const HeaderMenu: React.FC<MenuProps> = ({ lang, data, className, bgPrimary }) => {
  const { t } = useTranslation(lang, 'menu');
  const [hoverMenu, setHoverMenu] = useState(Boolean(false));
  return (
    <nav className={cn('headerMenu flex w-full', className)}>
      {data?.map((item: any) => (
        <div
          className={`menuItem group py-3 mx-4 xl:mx-4 2xl:mx-5 ${
            item.type != 'mega' ? 'relative' : ''
          }`}
          key={item.id}
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
        >
          <Link
            href={`/${lang}${item.path}`}
            className={`inline-flex items-center text-brand-secondary text-xs  py-2 font-medium relative group-hover:text-brand  ${
              !bgPrimary && 'text-white '
            }`}
          >
            {t(item.label)}
            {(item?.columns || item.subMenu) && (
              <span
                className={`text-xs w-4 flex justify-end  group-hover:text-brand ${
                  !bgPrimary && 'text-white'
                }`}
              >
                <BsChevronDown className="transition duration-300 ease-in-out transform" />
              </span>
            )}
          </Link>

          {item?.subMenu && Array.isArray(item?.subMenu) && (
            <>
              {item?.type != 'mega' ? (
                <div className="absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0 w-[220px] xl:w-[240px] group-hover:opacity-100">
                  <ul className="py-5 text-sm text-brand-muted">
                    {item.subMenu.map((menu: any, index: number) => {
                      const dept: number = 1;
                      const menuName: string = `sidebar-menu-${dept}-${index}`;
                      return (
                        <ListMenu
                          dept={dept}
                          data={menu}
                          hasSubMenu={menu.subMenu}
                          menuName={menuName}
                          key={menuName}
                          menuIndex={index}
                          lang={lang}
                        />
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <SubMega item={item} lang={lang} />
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
