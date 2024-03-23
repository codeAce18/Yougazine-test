import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { LinkProps } from 'next/link';
import { useTranslation } from 'src/app/i18n/client';
import cn from 'classnames';
import { categoryPlaceholder, productPlaceholder } from '@assets/placeholders';
import { ROUTES } from "@utils/routes";
import externaImageLoader from '@utils/external-image-loader';

interface Props {
    lang: string;
    item: any;
    href: LinkProps['href'];
    className?: string;
}

const CategoryCard: React.FC<Props> = ({ lang, item, href, className }) => {
    const { t } = useTranslation(lang, 'common');
    const { name, icon_image } = item ?? {};
    return (
        <div
            className={cn('group block', className)}
        >
            <Link className='w-full' href={href}>
                <div className="flex flex-col border rounded-xl shadow-md overflow-hidden h-[343px] w-[280px]">
                    <div className={` bg-skin-lightfill bg-opacity-50 h-[280px] w-[280px] m-auto flex justify-center align-center`}>
                        <Image
                            loader={icon_image ? externaImageLoader : undefined}
                            src={icon_image ?? productPlaceholder}
                            alt={name || 'Product Image'}
                            quality={100}
                            priority
                            width={100}
                            height={100}
                            className='w-[100%] h-[100%]  bg-contain bg-center bg-no-repeat'
                        />
                    </div>
                    <div className="category-info"> 
                        <h3 className="text-[16px] py-3  text-[#520B51] capitalize text-center font-medium hover:text-skin-primary">
                            {name}

                        </h3>
                    </div>


                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;
