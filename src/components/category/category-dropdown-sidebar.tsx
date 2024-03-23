'use client';

import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import SidebarMenu from '@components/ui/sidebar-menu';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import cn from 'classnames';
import SectionHeader from '@components/common/section-header';

interface CategorySidebarProps {
  lang: string;
  className?: string;
}

export default function CategoryDropdownSidebar({
  lang,
  className,
}: CategorySidebarProps) {
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });
  return (
    <aside className={cn('category-mobile-sidebar', className)}>
      <div className=" mb-5 md:mb-6">
        <SectionHeader
          sectionHeading={`text-all-categories`}
          className="mb-0 block-title"
          lang={lang}
        />
      </div>
      <div className="h-full max-h-full overflow-hidden ">
        {error ? (
          <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={error.message} />
          </div>
        ) : (
          <Scrollbar className="w-full h-full category-scrollbar">
            <div className="h-[calc(84vh_-_150px)] lg:h-full">
              {loading ? (
                Array.from({ length: 8 }).map((_, idx) => (
                  <CategoryListCardLoader
                    key={`category-list-${idx}`}
                    uniqueKey="category-list-card-loader"
                  />
                ))
              ) : (
                <SidebarMenu
                  className="list"
                  items={data?.categories?.data}
                  lang={lang}
                />
              )}
            </div>
          </Scrollbar>
        )}
      </div>
    </aside>
  );
}
