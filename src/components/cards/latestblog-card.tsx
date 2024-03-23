import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import {LinkProps} from 'next/link';
import Text from '@components/ui/text';
import {useTranslation} from 'src/app/i18n/client';
import {collectionPlaceholder} from '@assets/placeholders';
import {BsClock} from "react-icons/bs";
import {Blog} from "@framework/types";
import externaImageLoader from '@utils/external-image-loader';

interface Props {
    lang: string;
    imgWidth?: number;
    imgHeight?: number;
    href: LinkProps['href'];
    collection: Blog;
    showShortDesc?: boolean;
}

const LatestblogCard: React.FC<Props> = ({
                                             collection,
                                             imgWidth = 440,
                                             imgHeight = 280,
                                             href,
                                             lang,
                                             showShortDesc
                                         }) => {
    const {image, title, created_at, author_name, shortDescription} = collection;
    const {t} = useTranslation(lang, 'common');
    return (
        <Link href={href} className="group ">
            <div>
                <Image
                    loader={externaImageLoader}
                    src={image ?? collectionPlaceholder}
                    alt={t(title) || t('text-card-thumbnail')}
                    width={imgWidth}
                    height={imgHeight}
                    className="overflow-hidden  bg-skin-thumbnail object-cover transform transition duration-300 ease-in-out group-hover:opacity-90 "
                />
                <div className="flex flex-col mt-4">
                    <div>
                        <div
                            className="mb-1 lg:mb-1.5 text-[20px] font-bold text-[#520B51]"
                        >
                            {title}
                        </div>
                        <div className="sm:text-13px   short-des text-[#575757] max-w-[341.84px] leading-6 text-[14px] mb-1 pb-3">
                            <p>We've collated the top 20 UI inspiration sites, all with
                                links in one handy spot! Find your inspiration for your
                            next project.</p>
                        </div>
                    </div>

                    
                    
                
                    
                   
                
                </div>
            </div>
        </Link>
    );
};

export default LatestblogCard;
