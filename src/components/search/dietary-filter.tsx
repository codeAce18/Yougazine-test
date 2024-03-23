import React, { useEffect, useState } from 'react';
import { CheckBox } from '@components/ui/form/checkbox';
import { useDietaryQuery } from '@framework/dietary/get-all-dietary';
import { usePathname, useSearchParams } from 'next/navigation';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Disclosure } from '@headlessui/react';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import useQueryParam from '@utils/use-query-params';

export const DietaryFilter = ({ lang }: { lang: string }) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string[]>([]);

  const hasQueryKey = searchParams?.get('dietary');

  useEffect(() => {
    updateQueryparams('dietary', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(',') ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  const { data, isLoading, error } = useDietaryQuery({
    limit: 10,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    setFormState(
      formState.includes(value)
        ? formState.filter((item) => item !== value)
        : [...formState, value]
    );
  }
  const items = data?.dietary?.data;

  return (
    <div className="block">
      <Heading className="lg:text-xl mb-5 -mt-1 block-title">{t('text-dietary-needs')}</Heading>
      <div className="flex flex-col">
        {items?.slice(0, 3)?.map((item: any) => (
          <CheckBox
            key={`${item.name}-key-${item.id}`}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={formState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
            lang={lang}
          />
        ))}
        {items!.length > 3 && (
          <div className="w-full">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Panel className="pt-4 pb-2">
                    {items?.slice(3, items.length).map((item: any) => (
                      <CheckBox
                        key={`${item.name}-key-${item.id}`}
                        label={item.name}
                        name={item.name.toLowerCase()}
                        checked={formState.includes(item.slug)}
                        value={item.slug}
                        onChange={handleItemClick}
                        lang={lang}
                      />
                    ))}
                  </Disclosure.Panel>
                  <Disclosure.Button className="flex justify-center items-center w-full px-4 pt-3.5 pb-1 text-sm font-medium text-center text-brand focus:outline-none">
                    {open ? (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          {t('text-see-less')}
                        </span>
                        <IoIosArrowUp className="text-brand-dark text-opacity-60 text-15px" />
                      </>
                    ) : (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          {t('text-see-more')}
                        </span>
                        <IoIosArrowDown className="text-brand-dark text-opacity-60 text-15px" />
                      </>
                    )}
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
          </div>
        )}
      </div>
    </div>
  );
};
