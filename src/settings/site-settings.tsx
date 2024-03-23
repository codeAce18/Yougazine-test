import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';
import siteLogo from 'public/assets/images/yougazine-logo.png';
import siteLogoBlack from 'public/assets/images/yougazine-logo-purple.png';

export const siteSettings = {
  name: 'Yougazine',
  description:
    'Yougazine',
  author: {
    name: 'Sharpshooters',
    websiteUrl: '#',
    address: '',
  },
  logo: {
    url: siteLogo,
    urlReverse: siteLogoBlack,
    alt: 'Yougazine',
    href: '/en',
    width: 195,
    height: 26,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    topmenu: [
      {
        id: 1,
        path: '/my-account/wishlist/',
        label: 'menu-wishlists',
      },
      {
        id: 2,
        path: '/checkout/',
        label: 'menu-checkout',
      }
    ],
    menu: [
      {
        id: 1,
        path: '/',
        label: 'Home',
      },
      {
        id: 2,
        path: '/how-it-works',
        label: 'How it works',
        
      },
      {
        id: 3,
        path: '/search',
        label: 'menu-yougazine',
      },
      {
        id: 4,
        path: '/faq',
        label: 'menu-faq',
      },
      {
        id: 5,
        path: '/blog/blog-category-grid',
        label: 'menu-blog',
      },
      {
        id: 6,
        path: '/about-us',
        label: 'menu-about-us',
      },
      {
        id: 7,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
    ],
    languageMenu: [
      {
        id: 'en',
        name: 'English',
        value: 'en',
        icon: <USFlag />,
      },
    ],
    pagesMenu: [
      {
        id: 1,
        path: '/search',
        label: 'menu-best-deals',
      },
      {
        id: 2,
        path: '/about-us',
        label: 'menu-about-us',
      },
      {
        id: 3,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
      {
        id: 4,
        path: '/faq',
        label: 'menu-faq',
      },
    ],
  },
};
