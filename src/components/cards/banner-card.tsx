'use client';

import Link from '@components/ui/link';
import Image from 'next/image';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';

interface BannerProps {
    lang: string;
    banner: any;
    variant?: 'rounded' | 'default';
    effectActive?: boolean;
    className?: string;
    classNameInner?: string;
}

function getImage(deviceWidth: number, imgObj: any) {
    return deviceWidth < 768 ? imgObj.mobile : imgObj.desktop;
}

const BannerCard: React.FC<BannerProps> = ({
                                               lang,
                                               banner,
                                               className,
                                               variant = 'default',
                                               effectActive = true,
                                               classNameInner,
                                           }) => {
    const {width} = useWindowSize();
    const {slug, title, image} = banner;
    const selectedImage = getImage(width!, image);
    return (
        <div className={cn('mx-auto', className)}>
            <Link
                href={`/${lang}${slug}`}
                className={cn(
                    'h-full w-full group flex justify-center relative overflow-hidden',
                    classNameInner
                )}
            >
                <div className="relative inline-block overflow-hidden w-full box-sizing">
                    <div className="block w-full box-sizing">
                        <svg className="block max-w-full h-auto" xmlns="http://www.w3.org/2000/svg" width={selectedImage.width} height={selectedImage.height} version="1.1"/>
                    </div>
                    <Image
                        src={selectedImage.url}
                        alt={title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={cn('absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full min-w-full min-h-full object-cover', {
                            'rounded-md': variant === 'rounded',
                        })}
                       
                    />
                </div>
                {effectActive && (
                    <div
                        className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine"/>
                )}
            </Link>
        </div>
    );
};

export default BannerCard;
