'use client';

import { useTranslation } from 'src/app/i18n/client';
import { useState } from 'react';
import Link from 'next/link';
import Container from '@components/ui/container';
import { IoPlaySharp } from 'react-icons/io5';
import { useModalAction } from '@components/common/modal/modal.context';
import { BsPlayCircleFill } from 'react-icons/bs';
import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import { LIMITS } from '@framework/utils/limits';
import Image from 'next/image';
import externaImageLoader from '@utils/external-image-loader';
import { productPlaceholder } from '@assets/placeholders';
import PreviewSection from '@components/preview/preview';
const defaultValues = {};

const PreviewDesign: React.FC<{ lang: string }> = ({ lang }) => {
    const { data, isLoading, error } = useBestSellerProductsQuery({
        limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
    });
    const [sel, setSel] = useState(0);
    return (
        <div>
            {
                !isLoading && (
                    <div className="">

                        <h2 className="heading-with-line text-[40px] cormorant-medium text-black text-center relative"><span className='relative px-8 bg-white'>Preview our design portal</span></h2>
                        <div className="flex justify-center pt-10">
                            {
                                data?.slice(0, 4).map((template, index) => (
                                    <div className={`w-[100px] rounded-lg m-4 overflow-hidden cursor-pointer ${index == sel ? 'border-2 border-skin opacity-100' : 'bg-gray-350 opacity-50'}`} onClick={() => setSel(index)}>
                                        <Image
                                            loader={template.preview_images.length > 0 ? externaImageLoader : undefined}
                                            src={template.preview_images.length > 0 ? `${template.preview_images[0].image}` : productPlaceholder}
                                            alt={template.name || 'Template Image'}
                                            quality={100}
                                            width={0}
                                            height={0}
                                            sizes="100%"
                                            priority
                                            className="w-full h-auto object-cover bg-fill-thumbnail"
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        <PreviewSection id={data ? data[sel]._id : ''} pdf_file={data ? data[sel].pdf_file : ''} />
                    </div>
                )
            }
        </div>

    );
};

export default PreviewDesign;
