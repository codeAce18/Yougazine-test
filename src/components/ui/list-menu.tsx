import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Link from '@components/ui/link';
import { useTranslation } from 'src/app/i18n/client';
import {getDirection} from "@utils/get-direction";

const ListMenu = ({ lang, dept, data, hasSubMenu, menuIndex }: any) => {
  const { t } = useTranslation(lang, 'menu');
    const dir = getDirection(lang);
  return (
    <li className="relative">
      <Link
        href={`/${lang}${data.path}`}
        className="flex items-center justify-between py-2 ltr:pl-5 rtl:pr-5 xl:ltr:pl-7 xl:rtl:pr-7 ltr:pr-3 rtl:pl-3 xl:ltr:pr-3.5 xl:rtl:pl-3.5 hover:bg-fill-dropdown-hover hover:text-brand-dark"
      >
        {t(data.label)}
        {data.subMenu && (
            <span className="text-sm mt-0.5 shrink-0">
              {dir === 'rtl' ? <IoIosArrowBack className="text-body transition duration-300 ease-in-out group-hover:text-skin-base" />
                  : <IoIosArrowForward className="text-body transition duration-300 ease-in-out group-hover:text-skin-base" />}
          </span>
        )}
      </Link>
      {hasSubMenu && (
        <SubMenu
          dept={dept}
          data={data.subMenu}
          menuIndex={menuIndex}
          lang={lang}
        />
      )}
    </li>
  );
};

const SubMenu: React.FC<any> = ({ lang, dept, data, menuIndex }) => {
  dept = dept + 1;
  return (
    <ul className="absolute z-0 invisible w-56 py-3 transition-all duration-300 opacity-0 subMenuChild shadow-subMenu bg-brand-light ltr:right-full rtl:left-full 2xl:ltr:right-auto 2xl:rtl:left-auto 2xl:ltr:left-full 2xl:rtl:right-full top-4">
      {data?.map((menu: any, index: number) => {
        const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
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
  );
};

export default ListMenu;
