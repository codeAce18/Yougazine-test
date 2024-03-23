'use client';
import Accordion from '@components/ui/accordion';
import Container from '@components/ui/container';
import { useFAQQuery } from '@framework/faq/get-all-faq';
import cn from 'classnames';
import { useTranslation } from 'src/app/i18n/client';

interface Props {
  className?: string;
  lang?: string;
  showTitle?: boolean
}


const FAQ: React.FC<Props> = ({
  className = 'relative mb-8',
    lang = 'en',
    showTitle= false
}) => {

  const {data, isLoading, error} = useFAQQuery({});
  const { t } = useTranslation(lang, 'common');
  return (
    <div className='faq-bg w-full px-64 py-32'>
      <h2 className="heading-with-line text-[40px] cormorant-medium text-black text-center relative"><span className='relative px-8 bg-[#FFF4FA]'>We have answered</span></h2>
      <div className="flex flex-col py-12 mx-auto">
          {data?.data?.map((item, index) => (
            <Accordion
              key={`${item._id}-${index}`}
              item={{id: item._id, title: item.question, content: item.answer}}
              translatorNS="faq"
              lang={lang}
            />
          ))}
        </div>
    </div>
  );
};

export default FAQ;
