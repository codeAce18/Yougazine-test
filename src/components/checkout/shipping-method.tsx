import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiCheck } from 'react-icons/bi'; // Import the BiCheck icon
import cn from 'classnames';

interface userInterface {
  lang: string;
}

const deliveryTips = [
  { tip: '$5', courier: 'Courier', days: '3-5days' },
  { tip: '$10', courier: 'Courier', days: '1-2days' },
  { tip: '$15', courier: 'Courier', days: '1days' },
  { tip: '$20', courier: 'Courier', days: '2-3days' },
];

const Shippingmethod: React.FC<userInterface> = ({ lang }) => {
  const { t } = useTranslation(lang);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <div className="max-w-[300px] sm:max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {deliveryTips && deliveryTips.map(({ tip, courier, days }) => (
            <div
              key={tip}
              className={` w-[265px] flex rounded-lg border border-gray-300 py-2 my-2 hover:border-skin cursor-pointer ${selectedTip === tip ? 'border-skin text-skin' : ''}`}
              onClick={() => setSelectedTip(tip)}
            >
              <div className='flex items-center justify-between'>
                <span className={`w-[22px] mb-5 h-[20px] rounded-full shadow-inner border mx-3 ${selectedTip === tip ? 'border-skin bg-skin' : 'border-gray-100 bg-white'}`}>
                  {selectedTip === tip && <BiCheck className='w-4 h-4 text-white' />}
                </span>
                <div className='flex flex-col'>
                  <span className={cn({ 'text-black': selectedTip !== tip })}>{courier}</span>
                  <p className={`mt-1 ${cn({ 'text-black': selectedTip !== tip })}`}>{days}</p>
                </div>
                <span className={`ml-[70px] mb-5 ${cn({ 'text-black': selectedTip !== tip })}`}>{tip}</span>
              </div>
            </div>
          ))}
          {selectedTip && <p>Selected Tip: {selectedTip}</p>}
        </div>
      </div>
    </div>
  );
};

export default Shippingmethod;
