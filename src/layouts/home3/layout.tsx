'use client';

import { useSessionStorage } from 'react-use';
import Image from '@components/ui/image';
import HighlightedBar from '@components/common/highlighted-bar';
import Countdown from '@components/common/countdown';
import Header from '@layouts/home3/header';
import Footer from '@layouts/home3/footer';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
import { useIsMounted } from '@utils/use-is-mounted';
import { useTranslation } from 'src/app/i18n/client';

function ClientRenderedHighLightedBar({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'common');
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'yougazine-highlightedBar',
    'false'
  );

  return (
    <>
      {highlightedBar !== 'true' && (
        <HighlightedBar variant={"dark"} onClose={() => setHighlightedBar('true')}>
          <div className="flex items-center">
            <div className="hidden sm:flex shrink-0 items-center justify-center bg-brand-light w-9 h-9 rounded-full ltr:mr-2.5 rtl:ml-2.5">
              <Image
                width={23}
                height={23}
                src="/assets/images/delivery-box.svg"
                alt="Delivery Box"
                style={{ width: 'auto' }}
              />
            </div>
            <p
              // @ts-ignore
              dangerouslySetInnerHTML={{ __html: t('text-highlighted-bar') }}
            />
          </div>
          <Countdown date={Date.now() + 4000000 * 71} />
        </HighlightedBar>
      )}
    </>
  );
}

export default function MinimalLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const isMounted = useIsMounted();

  return (
    <div className="flex flex-col min-h-screen">
     
      {/* End of highlighted bar  */}

      <Header lang={lang} />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer lang={lang} />
      <MobileNavigation lang={lang} />
    </div>
  );
}
