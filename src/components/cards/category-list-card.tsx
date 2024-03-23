'use client';
import Link, {LinkProps} from 'next/link';
import Image from '@components/ui/image';
import {Category} from '@framework/types';
import cn from 'classnames';
import {useTranslation} from 'src/app/i18n/client';
import {ROUTES} from '@utils/routes';

interface Props {
    lang: string;
    category: Category;
    href: LinkProps['href'];
    className?: string;
    variant?: 'default' | 'small' | 'antique';
}

const CategoryListCard: React.FC<Props> = ({
                                               category,
                                               className,
                                               href,
                                               variant = 'default',
                                               lang,
                                           }) => {
    const {name, icon, image, children} = category;
    const {t} = useTranslation(lang, 'common');
    const SUBCATEGORIES_LIMITS = 5;
    return (
        <div className={`wb-categories__items relative`}>
            <div className="wb-categories__img">
                <div
                    className={cn(
                        'group  justify-between items-center px-0 transition ',
                        className
                    )}
                >
                    <Image
                        src={image?.original ?? '/assets/placeholder/category-small.svg'}
                        alt={name || t('text-category-thumbnail')}
                        width={variant === 'antique' ? 80 : 255}
                        height={variant === 'antique' ? 80 : 160}
                        priority
                        style={{width: '100%'}}
                        className="bg-sink-thumbnail object-cover transition duration-200 ease-in-out transform group-hover:opacity-80"
                    />
                
                </div>
            </div>
            <div className="wb-categories__info absolute">
                <h3
                    className={`wb-categories__info--heading text-[18px] text-white uppercase  font-medium hover:text-brand`}
                >
                    <Link href={href} legacyBehavior>{name}</Link>
                </h3>
                
                {Array.isArray(children) ? (
                    <ul key="content" className="wb-categories__info--sublist py-3 text-[15px] leading-8">
                        {children.slice(0, SUBCATEGORIES_LIMITS)?.map((currentItem: any, idx: number) => {
                            return (
                                <li className="pb-1 text-white hover:text-skin-primary" key={`${idx}`}>
                                    <Link
                                        href={`/${lang}${ROUTES.SEARCH}?category=${currentItem.slug}`}
                                    >
                                        {currentItem.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            </div>
        </div>
    );
};

export default CategoryListCard;
