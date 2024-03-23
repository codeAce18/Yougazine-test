import { useCart } from '@contexts/cart/cart.context';
import { Attribute, Price } from '@framework/types';
import { generateCartItem } from '@utils/generate-cart-item';
import cn from 'classnames';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
  templateId: any;
  prices: Price[];
  priceId:any;
  setPriceId:(key: any)=>void;
}




const CheckoutPricing: React.FC<Props> = ({
  className = 'mb-2 pt-0.5',
  templateId,
  prices,
  priceId,
  setPriceId,
}) => {
  if (!prices) return null;
  const type: Attribute[] = prices.map(p => p.type).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const pages: Attribute[] = prices.map(p => p.pages).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const quality: Attribute[] = prices.map(p => p.quality).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const binding: Attribute[] = prices.map(p => p.binding).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();
  const quantity: Attribute[] = prices.map(p => p.quantity).filter((elem, index, self) => index === self.findIndex(f => f._id === elem._id)).sort();

  const { updateCart } = useCart();
  const [pageSel, setPageSel] = useState();
  const [qualitySel, setQualitySel] = useState();
  const [bindingSel, setBindingSel] = useState();
  const [typeSel, setTypeSel] = useState();
  const [quantitySel, setQuantitySel] = useState();

  const addToCart = async () => {
    console.log(priceId);
    if(templateId && priceId) {
      await generateCartItem(templateId, "", priceId);
      await updateCart();
    }
  }

  useEffect(() => {
    console.log(priceId);
    const p = prices.find(pr => pr._id == priceId);
    console.log(p);
    if(p) {
      setPageSel(p.pages._id);
      setTypeSel(p.type._id);
      setQualitySel(p.quality._id);
      setQuantitySel(p.quantity._id);
      setBindingSel(p.binding._id);
    }
  }, [])
  

  useEffect(()=>{
    if(pageSel && qualitySel && bindingSel && typeSel && quantitySel){
      const i = prices.findIndex( x => (x.type._id === typeSel && x.quantity._id === quantitySel && x.pages._id === pageSel && x.quality._id === qualitySel && x.binding._id === bindingSel))
      if(i) {
        console.log(i);
        setPriceId(prices[i]._id);
        addToCart();
      }
    } else {
      setPriceId(null);
    }
  },[pageSel, qualitySel, bindingSel, typeSel, quantitySel])

  return (
    <>
      <h1 className='text-sm font-bold py-2 border-t mt-2 border-gray-300'>Your selections</h1>
      <div className={cn(className)} key={'quality'}>
        <h4 className="mb-3 capitalize text-xs text-black">
          {'Page Quality'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          {quality.map((q: any) => (
            <li
              key={`${'quality'}-${q._id}`}
              className={cn(
                'cursor-pointer rounded border h-9 md:h-10 p-0.5 mb-2 md:mb-3 ltr:mr-1 rtl:ml-1 flex justify-center items-center font-medium text-xs text-black transition duration-200 ease-in-out hover:text-brand hover:border-gray-350 px-3',
                {
                  'border-brand text-brand bg-skin-lightfill bg-opacity-50':
                    qualitySel === q._id,
                }
              )}
              onClick={() =>
                setQualitySel(q._id)
              }
            >
              {q.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(className)} key={'pages'}>
        <h4 className="mb-3 capitalize text-xs text-black">
          {'No. of Pages'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          {pages.map((p: any) => (
            <li
              key={`${'pages'}-${p._id}`}
              className={cn(
                'cursor-pointer rounded border h-9 md:h-10 p-0.5 mb-2 md:mb-3 ltr:mr-1 rtl:ml-1 flex justify-center items-center font-medium text-xs text-black transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
                {
                  'border-brand text-brand bg-skin-lightfill bg-opacity-50':
                    pageSel === p._id,
                }
              )}
              onClick={() =>
                setPageSel(p._id)
              }
            >
              {p.value}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(className)} key={'binding'}>
        <h4 className="mb-3 capitalize text-xs text-black">
          {'Binding'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          { binding.map((b: any) => (
            <li
              key={`${'type'}-${b._id}`}
              className={cn(
                'cursor-pointer rounded border h-9 md:h-10 p-0.5 mb-2 md:mb-3 ltr:mr-1 rtl:ml-1 flex justify-center items-center font-medium text-xs text-black transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
                {
                  'border-brand text-brand bg-skin-lightfill bg-opacity-50':
                    bindingSel === b._id,
                }
              )}
              onClick={() =>
                {
                  setBindingSel(b._id);
                }
              }
            >
              {b.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(className)} key={'type'}>
        <h4 className="mb-3 capitalize text-xs text-black">
          {'Type of Magazine'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          {
            type.map((t: any) => (
              <li
                key={`${'type'}-${t._id}`}
                className={cn(
                  'cursor-pointer rounded border h-9 md:h-10 p-0.5 mb-2 md:mb-3 ltr:mr-1 rtl:ml-1 flex justify-center items-center font-medium text-xs text-black transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
                  {
                    'border-brand text-brand bg-skin-lightfill bg-opacity-50':
                      typeSel === t._id,
                  }
                )}
                onClick={() =>
                  setTypeSel(t._id)
                }
              >
                {t.name}
              </li>
            ))
          }
        </ul>
      </div>
      <div className={cn(className)} key={'quantity'}>
        <h4 className="mb-3 capitalize text-xs text-black">
          {'No. of Copies'}
        </h4>

        <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
          {quantity.map((q: any) => (
            <li
              key={`${'quantity'}-${q._id}`}
              className={cn(
                'cursor-pointer rounded border h-9 md:h-10 p-0.5 mb-2 md:mb-3 ltr:mr-1 rtl:ml-1 flex justify-center items-center font-medium text-xs text-black transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
                {
                  'border-brand text-brand bg-skin-lightfill bg-opacity-50':
                    quantitySel === q._id,
                }
              )}
              onClick={() =>
                setQuantitySel(q._id)
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

export default CheckoutPricing;
