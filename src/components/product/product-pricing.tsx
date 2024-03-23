import { Attribute, Price } from '@framework/types';
import cn from 'classnames';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
  prices: Price[];
  attributes: any;
  setAttributes: (key: any) => void;
  indexNum:any,
  setIndexNUm:(key: any)=>void;
  setCartPriceDesc:(key: any)=>void;
}




const ProductPricing: React.FC<Props> = ({
  className = 'mb-2 pt-0.5',
  prices,
  attributes,
  setAttributes,
  indexNum,
  setIndexNUm,
  setCartPriceDesc
}) => {
  if (!prices) return null;
  const type: Attribute[] = prices.map(p => p.type).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const pages: Attribute[] = prices.map(p => p.pages).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const quality: Attribute[] = prices.map(p => p.quality).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const binding: Attribute[] = prices.map(p => p.binding).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const quantity: Attribute[] = prices.map(p => p.quantity).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();

  const [bindingName,setBindingName]= useState()

  

  useEffect(()=>{
    if(Object.keys(attributes).length === 5){
      const i = prices.findIndex( x => (x.type._id === attributes.type && x.quantity._id === attributes.quantity && x.pages._id === attributes.pages._id && x.quality._id === attributes.quality && x.binding._id ===attributes.binding))
     setIndexNUm(i)
     setCartPriceDesc(i != -1 ? prices[i] : null)
    } else {
      setIndexNUm(-1);
      setCartPriceDesc(null);
    }
  },[attributes])

  return (
    <>

      <div className={cn(className)} key={'quality'}>
        <h4 className="mb-3 capitalize text-15px text-black">
          {'Page Quality'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          {quality.map((q: any) => (
            <li
              key={`${'quality'}-${q._id}`}
              className={cn(
                'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 flex justify-center items-center font-medium text-sm md:text-15px text-black transition duration-200 ease-in-out hover:text-brand hover:border-gray-350 px-3',
                {
                  'border-brand text-brand':
                    attributes['quality'] === q._id,
                }
              )}
              onClick={() =>
                setAttributes((prev: any) => ({
                  ...prev,
                  quality: q._id,
                }))
              }
            >
              {q.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(className)} key={'pages'}>
        <h4 className="mb-3 capitalize text-15px text-black">
          {'No. of Pages'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          {pages.map((p: any) => (
            <li
              key={`${'pages'}-${p._id}`}
              className={cn(
                'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 flex justify-center items-center font-medium text-sm md:text-15px text-black transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
                {
                  'border-brand text-brand':
                    attributes['pages'] === p,
                }
              )}
              onClick={() =>
                setAttributes((prev: any) => ({
                  ...prev,
                  pages: p,
                }))
              }
            >
              {p.value}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(className)} key={'binding'}>
        <h4 className="mb-3 capitalize text-15px text-black">
          {'Binding'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          { binding.map((b: any) => (
            <li
              key={`${'type'}-${b._id}`}
              className={cn(
                'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 flex justify-center items-center font-medium text-sm md:text-15px text-black transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
                {
                  'border-brand text-brand':
                    attributes['binding'] === b._id,
                }
              )}
              onClick={() =>
                {
                  setAttributes((prev: any) => ({
                    ...prev,
                    binding: b._id,
                  }));
                  setBindingName(b.name)
                }
              }
            >
              {b.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(className)} key={'type'}>
        <h4 className="mb-3 capitalize text-15px text-black">
          {'Type of Magazine'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          {
            type.map((t: any) => (
              <li
                key={`${'type'}-${t._id}`}
                className={cn(
                  'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 flex justify-center items-center font-medium text-sm md:text-15px text-black transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
                  {
                    'border-brand text-brand':
                      attributes['type'] === t._id,
                  }
                )}
                onClick={() =>
                  setAttributes((prev: any) => ({
                    ...prev,
                    type: t._id,
                  }))
                }
              >
                {t.name}
              </li>
            ))
          }
        </ul>
      </div>
      <div className={cn(className)} key={'quantity'}>
        <h4 className="mb-3 capitalize text-15px text-black">
          {'No. of Copies'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          {quantity.map((q: any) => (
            <li
              key={`${'quantity'}-${q._id}`}
              className={cn(
                'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 flex justify-center items-center font-medium text-sm md:text-15px text-black transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
                {
                  'border-brand text-brand':
                    attributes['quantity'] === q._id,
                }
              )}
              onClick={() =>
                setAttributes((prev: any) => ({
                  ...prev,
                  quantity: q._id,
                }))
              }
            >
              {q.value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductPricing;
