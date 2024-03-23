import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'src/app/i18n/client';
import Text from '@components/ui/text';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUI } from '@contexts/ui.context';
import { useState } from 'react';


const DeliveryInstructions: React.FC<{ lang: string }> = ({
  lang,
}) => {
  const { t } = useTranslation(lang);
  const { orderData, setOrderData } = useUI();
  const [projectName, setProjectName] = useState(orderData?.projectName);
  const [eventDate, setEventDate] = useState(orderData?.eventDate);

  function onSubmit() {
    setOrderData({ projectName, eventDate });
  }

  return (
    <div className="w-full pt-3">
      <div className="w-full mx-auto">
        <label
          className="w-full font-medium align-middle text-black text-sm"
        >
          {'Project Name'}
        </label>
        <div className="mt-2 mb-6">

          <input
            className="w-full text-black text-sm border border-gray-300"
            placeholder={t('forms:label-project-name')}
            value={orderData?.projectName}
            onChange={(e: any) => setOrderData({ projectName: e.target.value, eventDate: orderData?.eventDate })}
            lang={lang}
          />
        </div>
        <label
          className="w-full font-medium align-middle text-black text-sm"
        >
          {'Date of Event'}
        </label>
        <div className="mt-2 mb-6">

          <DatePicker
            className='w-full text-black text-sm border border-gray-300 min-w-[200px]'
            placeholderText={t('forms:label-event-date')}
            selected={orderData?.eventDate}
            onChange={(d) => setOrderData({ projectName: orderData?.projectName, eventDate: d })}
            dateFormat={'yyyy-MM-dd'}
            minDate={new Date()}
          />
          <Text className="ltr:ml-8 rtl:mr-8 pt-2.5" variant="small">
            {t('common:text-selecting-this-option')}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInstructions;
