'use client';

import { usePathname } from 'next/navigation';
import { useLogoutMutation } from '@framework/auth/use-logout';
import { useTranslation } from 'src/app/i18n/client';
import LogoutIcon from '@components/icons/account-logout';
import Link from '@components/ui/link';
import { useCart } from '@contexts/cart/cart.context';

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNav({
  options,
  lang,
}: {
  options: Option[];
  lang: string;
}) {
  const { t } = useTranslation(lang, 'common');
  const { mutate: logout } = useLogoutMutation(lang);
  const { resetCart } = useCart();

  const pathname = usePathname();
  const newPathname = pathname.split('/').slice(3, 4);
  const mainPath = `/${newPathname[0]}`;
  return (
    <nav className="flex flex-col pb-2 overflow-hidden border rounded-md md:pb-6 border-border-base">
      {options.map((item) => {
        const menuPathname = item.slug.split('/').slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;

        return (
          <Link
            key={item.slug}
            href={`/${lang}${item.slug}`}
            className={`flex items-center cursor-pointer text-sm lg:text-15px text-brand-dark py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 hover:text-brand ${
              mainPath === menuPath ? 'bg-fill-secondary font-medium' : 'font-normal'
            }`}
          >
            <span className="flex justify-center w-6 me-1 ">
              {item.icon}
            </span>
            <span className="ltr:pl-1 lg:rtl:pr-1.5">{t(item.name)}</span>
          </Link>
        );
      })}
      <button
        className="flex items-center text-sm lg:text-15px text-brand-dark py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 cursor-pointer focus:outline-none"
        onClick={() => {logout(); resetCart();}}
      >
        <span className="flex justify-center w-6 me-1 ">
          <LogoutIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />
        </span>
        <span className="ltr:pl-1 lg:rtl:pr-1.5">{t('text-logout')}</span>
      </button>
    </nav>
  );
}
