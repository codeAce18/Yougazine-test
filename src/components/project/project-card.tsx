import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Order, Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { Eye } from '@components/icons/eye-icon';
import { useCart } from '@contexts/cart/cart.context';

import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
import { useTranslation } from 'src/app/i18n/client';
import { ROUTES } from '@utils/routes';
import Link from '@components/ui/link';
import SearchIcon from '@components/icons/search-icon';
import { useProductQuery } from '@framework/product/get-product';
import { useProductByIdQuery } from '@framework/product/get-product-by-id';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';

const externaImageLoader = ({ src }: { src: string }) =>
    `https://d2qs6wfbkerq2c.cloudfront.net/${src}`;

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
    ssr: false,
});

interface ProductProps {
    lang: string;
    project: any;
    className?: string;
    project_id:string
}

const ProjectCard: React.FC<ProductProps> = ({ project, className, lang ,project_id}) => {
    const { openModal } = useModalAction();
    const { t } = useTranslation(lang, 'common');
    const { width } = useWindowSize();
    const iconSize = width! > 1024 ? '20' : '17';
    return (
        <article
            className={cn(
                'flex flex-col product-card relative h-full shadow-xl',
                className
            )}
            title={project?.name}
        >
            <div className="relative flex-shrink-0 overflow-hidden prodimg m-3">
                <div className="relative card-img-container overflow-hidden mx-auto w-full h-[245px]">
                    <Image
                        loader={project?.project_file ? externaImageLoader : null}
                        src={project?.project_file ? project.project_file : productPlaceholder}
                        alt={project?.name || 'Project Image'}
                        quality={100}
                        fill
                        priority
                        className="object-cover bg-fill-thumbnail"
                    />
                </div>

            </div>
            <div className="flex mb-2 ml-2 h-full overflow-hidden relative">
                <Link
                    href={`/${lang}${ROUTES.PROJECT}/${project_id}`}
                    className="text-skin-purple text-sm leading-5 min-h-[40px] line-clamp-2 mb-2 hover:text-brand"
                >
                    {project?.name}
                </Link>
                <span className='pl-3 cursor-pointer'><AiOutlineEdit className='text-brand hover:text-brand-secondary' /></span>
            </div>
        </article>
    );
};

export default ProjectCard;
