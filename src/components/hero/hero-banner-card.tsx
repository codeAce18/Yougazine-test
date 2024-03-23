'use client';

import cn from 'classnames';
import Link from '@components/ui/link';
import useWindowSize from '@utils/use-window-size';
import { useTranslation } from 'src/app/i18n/client';
import HeroSearchBox from '@components/hero/hero-banner-search';

interface BannerProps {
  lang: string;
  banner?: any;
  className?: string;
  heroContentCard?: boolean;
  variant?: 'default' | 'slider' | 'medium' | 'antique';
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

export default function HeroBannerCard({
  lang,
  banner,
  className = 'py-20 xy:pt-24',
  variant = 'default',
  heroContentCard = true,
}: BannerProps) {
  const { t } = useTranslation(lang, 'common');
  const { width } = useWindowSize();
  const { title, description, image } = banner;
  const selectedImage = getImage(width!, image);
  return heroContentCard ? (
    <div
      className={cn(
        'w-full bg-no-repeat bg-cover bg-center flex items-center rounded',
        {
          'min-h-[320px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[550px]':
            variant === 'slider',
        },
        {
          'bg-fill-thumbnail': variant !== 'antique',
        },
        className
      )}
      style={{
        backgroundImage: `url('${selectedImage.url}')`,
        backgroundPosition:
          variant === 'antique' ? 'left bottom -10px' : 'center center',
      }}
    >
      <div
        className={cn(
          'sm:absolute inset-0 mx-auto m-[15px] md:mt-[30px] xl:mt-[120px] xl:max-w-[1000px] 2xl:max-w-[1300px]',
          {
            'max-w-[480px] md:max-w-[550px]': variant === 'default' || 'slider',
            'max-w-[480px] md:max-w-[650px]': variant === 'medium',
            '2xl:max-w-[1005px]': variant === 'antique',
          }
        )}
      >
        <div className="text-left">
          <h2
            className={cn('text-xl lg:text-4xl font-medium', {
              'xl:text-5xl 2xl:text-[48px] text-brand-light leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 ':
                variant !== 'antique',
              'text-brand-light xl:text-5xl 2xl:text-[48px]':
                variant === 'default',
              'text-brand-light xl:text-[40px] 2xl:text-5xl 2xl:mb-4 2xl:pb-0.5':
                variant === 'medium',
            })}
          >
            {t(title)}
          </h2>
          <p
            className={cn(
              'text-base md:text-[15px] xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em]',
              {
                'text-brand-light ': variant === 'default',
                'text-brand-light': variant === 'slider',
                '2xl:px-24': variant === 'medium',
                'xl:text-xl': variant === 'antique',
              }
            )}
          >
            {t(description)}
          </p>

          {banner.btnText && (
            <Link
              href={`/${lang}${banner.btnUrl}`}
              className="text-brand-light h-[45px] mt-5 md:mt-12 text-base inline-flex items-center justify-center transition duration-300 rounded px-10 py-2 font-semibold border-2  hover:border-brand hover:bg-brand"
            >
              {t(banner.btnText)}
            </Link>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Link href={`/${lang}${banner.btnUrl}`}>
      <div
        className={cn(
          'w-full bg-skin-thumbnail bg-no-repeat bg-cover flex items-center',
          {
            'min-h-[160px]  ': variant === 'slider',
          },
          className
        )}
        style={{
          backgroundImage: `url('${selectedImage.url}')`,
          backgroundPosition:
            variant === 'antique' ? 'left bottom -10px' : 'center center',
        }}
      ></div>
    </Link>
  );
}
