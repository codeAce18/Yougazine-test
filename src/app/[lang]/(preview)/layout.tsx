import ManagedModal from '@components/common/modal/managed-modal';
import { ManagedUIContext } from '@contexts/ui.context';
import { dir } from 'i18next';
import { languages } from '../../i18n/settings';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { Metadata } from 'next';
import ToasterProvider from 'src/app/provider/toaster-provider';
import Providers from 'src/app/provider/provider';
import { Poppins, Rubik } from 'next/font/google';
// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/custom-plugins.css';
import '../globals.css';
import '@assets/css/rc-drawer.css';
import '@assets/css/themes.scss';

const rubik = Rubik({
  weight: ['300','400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

const poppins = Poppins({
  weight: ['300','400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});


export const metadata: Metadata = {
  title: {
    template: 'Yougazine | %s',
    default: 'Yougazine',
  },
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang={lang} dir={dir(lang)}>
      <body className={`${rubik.variable}`}>
        <Providers>
          <ManagedUIContext>
            {children}
            <ManagedModal lang={lang} />
            <ManagedDrawer lang={lang} />
            <ToasterProvider />
          </ManagedUIContext>
        </Providers>
      </body>
    </html>
  );
}
