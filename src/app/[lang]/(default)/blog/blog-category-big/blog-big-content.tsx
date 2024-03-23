'use client';
import type {FC} from 'react';
import { useTranslation } from 'src/app/i18n/client';
import cn from 'classnames';
import BlogCardBig from "@components/blog/blog-card-big";
import {useState} from "react";
import Pagination from "@components/ui/pagination";
import {GrNext, GrPrevious} from "react-icons/gr";

interface blogGridProps {
    dataBlog?: any;
    className?: string;
    lang: string
}

export const BlogBigContent: FC<blogGridProps> = ({dataBlog, className = '',lang}) => {
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
                    'grid grid-cols-1 gap-[35px] ',
                    className
                )}
                >
                {
                    filterData?.map((item: any) => {  return <BlogCardBig key={`blog--key-${item.id}`} blog={item} lang={lang}/>;})
                }

                {/* end of error state */}
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
