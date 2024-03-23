'use client';

import type {FC} from 'react';
import { useTranslation } from 'src/app/i18n/client';
import BlogCard from '@components/blog/blog-card';
import cn from 'classnames';
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "@components/ui/pagination";
import {useState} from "react";

interface blogGridProps {
    dataBlog?: any;
    className?: string;
    lang: string
}

export const BlogContent: FC<blogGridProps> = ({dataBlog, className = '',lang}) => {
    const { t } = useTranslation(lang, 'common');

    const [currentPage, setCurrentPage] = useState(1);
    const [value, setValue] = useState('');
    const countPerPage = 8;
    const useDatablog = dataBlog?.slice(0, countPerPage);
    let [filterData, setDataValue] = useState(useDatablog);

    const updatePage = (p: any) => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setDataValue(dataBlog?.slice(from, to));
    };
    return (
        <>
            <div
                className={cn(
                    className,
                    'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] sm:gap-[30px]'
                )}
                >
                {filterData?.map((item: any) => {
                            return <BlogCard key={`blog--key-${item.id}`} blog={item} lang={lang}/>;
                   })
                }

            </div>
            <Pagination
                current={currentPage}
                onChange={updatePage}
                pageSize={countPerPage}
                total={dataBlog?.length}
                prevIcon={<GrPrevious size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                nextIcon={<GrNext size={14}  className={`m-auto my-1.5 rtl:rotate-180`}/>}
                className="blog-pagination"
            />
        </>
    );
};

export class BlogBigContent {
}
