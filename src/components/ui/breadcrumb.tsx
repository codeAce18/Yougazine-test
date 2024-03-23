'use client';

import React from 'react';
import ActiveLink from '@components/ui/active-link';
import useBreadcrumb, { convertBreadcrumbTitle } from '@utils/use-breadcrumb';
import { IoChevronForward } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';

interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="text-sm text-brand-muted px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-brand-dark"
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li className="text-base text-brand-dark" {...props}>
      {children}
    </li>
  );
};

export const BreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);

  children = children?.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="flex items-center ">
      <ol className="flex items-center w-full overflow-hidden">{children}</ol>
    </div>
  );
};

const Breadcrumb: React.FC<{ separator?: string; lang: string }> = ({
  separator = (
    <IoChevronForward className="text-brand-dark text-opacity-40 text-15px" />
  ),
  lang,
}) => {
  const breadcrumbs = useBreadcrumb();
  const { t } = useTranslation(lang, 'common');
  return (
    <BreadcrumbItems separator={separator}>
      <ActiveLink
        legacyBehavior
        href={`${ROUTES.HOME}`}
        activeClassName="font-semibold text-heading"
        lang={lang}
      >
        <a className="inline-flex ">
          <IoHomeOutline className="ltr:mr-1.5 rtl:ml-1.5 text-brand-dark text-15px" />
          {t('breadcrumb-home')}
        </a>
      </ActiveLink>

      {breadcrumbs?.map((breadcrumb: any) => (
        <ActiveLink
            href={`${breadcrumb.href}`}
          activeClassName="text-heading"
          key={breadcrumb.href}
          legacyBehavior
          lang={lang}
        >
          <a className="capitalize">
            {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
          </a>
        </ActiveLink>
      ))}
    </BreadcrumbItems>
  );
};

export default Breadcrumb;
