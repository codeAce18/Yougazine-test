import usePrice from '@framework/product/use-price';
import Image from '@components/ui/image';
import externaImageLoader from '@utils/external-image-loader';

export const OrderDetailsContent: React.FC<{ item?: any }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.price,
    currencyCode: 'USD',
  });
  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-border-base text-[12px] md:text-[14px]">
      <div className="self-center col-span-2">
        <Image
          loader={externaImageLoader}
          src={item?.template_image}
          alt={item?.template?.name || 'Product Image'}
          width="60"
          height="60"
          quality={100}
          className="object-cover"
          style={{ width: 'auto' }}
        />
      </div>
      <div className="self-center col-span-8 p-2">
        <h2 className="text-brand-dark">{item?.template?.name || 'Template Name will come Here'}</h2>
        <div className="flex justify-between flex-wrap p-3">
        {typeof item.quantity === 'number' && <p className='mb-0 italic'>Quantity: {item.quantity}</p>}
        {typeof item.quality === 'string' && <p className='mb-0 italic'>Quality: {item.quality}</p>}
        {typeof item.pages === 'string' && <p className='mb-0 italic'>Pages: {item.pages}</p>}
        {typeof item.type === 'string' && <p className='mb-0 italic'>Type: {item.type}</p>}
        {typeof item.binding === 'string' && <p className='mb-0 italic'>Binding: {item.binding}</p>}
        </div>
      </div>
      <div className="self-center col-span-2">
        {typeof item.price === 'number' && <p>{price}</p>}
      </div>
    </div>
  );
};
