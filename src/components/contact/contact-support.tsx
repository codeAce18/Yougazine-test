'use client';

import { FC } from 'react';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import Heading from '@components/ui/heading';
import Link from '@components/ui/link';
import { useIsMounted } from '@utils/use-is-mounted';
import { useTranslation } from 'src/app/i18n/client';
import LocationIcon from '@components/icons/contact/location-icon';
import PhoneIcon from '@components/icons/contact/phone-icon';
import MailIcon from '@components/icons/contact/mail-icon';
const data = [
  {
    id: 1,
    slug: '',
    icon: (
        <LocationIcon  />
    ),
    name: 'text-office-location',
    description: 'text-office-location-details',
  },
  {
    id: 2,
    slug: '',
    icon: (
        <PhoneIcon  />
    ),
    name: 'text-phone',
    description: 'text-phone-details',
  },
  {
    id: 3,
    slug: 'mailto:info@yougazine.com',
    icon: (
        <MailIcon  />
    ),
    name: 'text-email',
    description: 'text-email-details',
  },
];

interface Props {
  lang: string;
  image?: HTMLImageElement;
}

const ContactSupport: FC<Props> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const mounted = useIsMounted();
  return (
    <div className="mb-0 3xl:ltr:pr-5 3xl:rtl:pl-5">
      <Heading variant="heading" className="mb-3 lg:mb-4 xl:mb-5">
        {mounted && <>{t('contact-form-info-title')}</>}
      </Heading>

      <div className="mx-auto space-y-4 mb-6">
        {data.map((item, idx) => (
            <div
                key={`contact--key${item.id}`}
                className="flex flex-col lg:flex-row max-w-xs lg:max-w-sm xl:pe-7"
            >
              <div className="flex-shrink-0 w-14  h-14 border-2 border-border-two p-3 rounded-md">{item.icon}</div>
              <div className="lg:ps-3 2xl:ps-4 mt-4 lg:mt-0">
                <Heading variant="base" className="">
                  {t(item.name)}
                </Heading>
                {
                  (item.slug !== '') ? (
                    <a href={item.slug}><Text>{t(item.description)}</Text></a>
                  ) : (
                    <Text>{t(item.description)}</Text>
                  )
                }
              </div>

            </div>
        ))}
      </div>
      <Text className="xl:leading-8">
        {mounted && <>{t('contact-form-info-content')}</>}
      </Text>
    </div>
  );
};

export default ContactSupport;
