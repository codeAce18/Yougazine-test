'use client';

import Link from 'next/link';
import Heading from "@components/ui/heading";
import Image from '@components/ui/image';
import {ROUTES} from '@utils/routes';
import {useTranslation} from 'src/app/i18n/client';
import {useRouter} from "next/navigation";
import {getDirection} from "@utils/get-direction";

interface AboutProps {
    lang: string;
    className?: string;
    social?: {
        id: string | number;
        path?: string;
        name: string;
        image: string;
        width: number;
        height: number;
    }[];
}

const WidgetAbout: React.FC<AboutProps> = ({lang, social, className}) => {
    const {t} = useTranslation(lang, 'footer');
    const {locale} = useRouter();
    const dir = getDirection(locale);
    
    return (
        <div className={`pb-10 sm:pb-0 ${className}`}>
            <div className="text-sm max-w-[350px] sm:ms-0 pb-2">
                <div className="text-base text-[#520B51] font-bold mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                    {t(`link-contact-us`)}
                </div>
                
                <div className="mb-3">{t('text-address')} {t('link-address')}</div>
                <div className="mb-3">{t('text-phone')} {t('link-phone')}</div>
                <div className="mb-3">{t('text-email')} {t('link-email')}</div>
            </div>
            
            {social && (
                <ul className="flex flex-wrap  space-x-4 md:space-s-5 mx-auto md:mx-0">
                    {social?.map((item) => (
                        <li
                            className="transition hover:opacity-80"
                            key={`social-list--key${item.id}`}
                        >
                            <Link href={item.path ? item.path : '/#'} legacyBehavior>
                                <a target="_blank" rel="noreferrer">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        height={item.height}
                                        width={item.width}
                                        className="transform scale-85 md:scale-100"
                                        style={{width: 'auto'}}
                                    />
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WidgetAbout;
