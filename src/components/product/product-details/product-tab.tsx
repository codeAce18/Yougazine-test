import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Heading from '@components/ui/heading';
import ProductReviewRating from './product-review-rating';
import Image from 'next/image';
import externaImageLoader from '@utils/external-image-loader';
import { productGalleryPlaceholder } from '@assets/placeholders';
import FAQ from '@components/faq/faq';
import { ProductGrid } from '../product-grid';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetailsTab({ lang, data }: { lang: string, data: any }) {
  let [tabHeading] = useState({
    Product_Details: '',
    Review_Rating: '',
    Compare: ''
  });

  return (
    <div className="w-full xl:px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="block border-b border-border-base">
          {Object.keys(tabHeading).map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                classNames(
                  'relative font-semibold inline-block transition-all text-sm leading-5  focus:outline-none pb-1 lg:pb-1 hover:text-brand ltr:mr-8 rtl:ml-8',
                  selected
                    ? 'text-brand-dark  after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:ltr:left-0 after:rtl:right-0 after:bg-brand'
                    : 'text-gray-400'
                )
              }
            >
              {item.split('_').join(' ')}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          <Tab.Panel className="lg:flex">
            <div className="flex flex-col text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
              <div className="pb-4 lg:pb-8">
                <div className="md:mb-2.5 block -mt-1.5">
                  <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                    {data?.name}
                  </h2>

                </div>
                {data?.category.length ? (
                  <div className="text-sm font-medium md:text-15px">
                    {data?.category[0]?.name}

                    <div className='mt-1 flex'>
                      <h2 className="text-lg font-medium duration-300 text-brand-dark md:text-xl xl:text-2xl">
                        {`$${data?.prices[0].price} - $${data?.prices[data?.prices.length - 1].price}`}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <></>
                  // <VariationPrice
                  //   selectedVariation={selectedVariation}
                  //   minPrice={data?.min_price}
                  //   maxPrice={data?.max_price}
                  //   lang={lang}
                  // />
                )}
              </div>
              <div className='w-1/2 sm:w-full'>
                <p dangerouslySetInnerHTML={{ __html: data.details }}></p>
              </div>
            </div>

          </Tab.Panel>
          <Tab.Panel>
            <ProductReviewRating template={data._id} lang={lang} />
          </Tab.Panel>
          <Tab.Panel>
            <ProductGrid lang={lang} viewAs={true} className='!grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2' />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
