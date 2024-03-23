'use client';

import { useSessionStorage } from 'react-use';
import Image from '@components/ui/image';
import HighlightedBar from '@components/common/highlighted-bar';
import Countdown from '@components/common/countdown';
import Header from '@layouts/process/header';
import Footer from '@layouts/footer/footer';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';

function ClientRenderedHighLightedBar({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'common');
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'yougazine-highlightedBar',
    'false'
  );
  return (
    <>
      {highlightedBar !== 'true' && (
        <HighlightedBar onClose={() => setHighlightedBar('true')}>
          <div className="flex items-center">
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

export default function ProcessLayout({
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
      <MobileNavigation lang={lang} />
    </div>
  );
}
