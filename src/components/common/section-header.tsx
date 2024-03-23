'use client';

import cn from 'classnames';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import { useTranslation } from 'src/app/i18n/client';

interface Props {
  lang: string;
  sectionHeading?: string;
  sectionSubHeading?: string;
  className?: string;
  headingPosition?: 'left' | 'center';
}

const SectionHeader: React.FC<Props> = ({
  lang,
  sectionHeading = 'text-section-title',
  sectionSubHeading,
  className = 'mb-3',
  headingPosition = 'left',
}) => {
  const { t } = useTranslation(lang, 'common');
  return (
    <div
      className={cn(` ${className}`, {
          'text-center pb-2 lg:pb-3 xl:pb-4 lg:max-w-[450px] lg:mx-auto':
          headingPosition === 'center',
      })}
    >
      <Heading
        variant="titleLarge"
        className={cn({
          '3xl:text-[25px] 3xl:leading-9': headingPosition === 'center',
        })}
      >
        <div className='cormorant-thin text-[45.56px] text-black'  dangerouslySetInnerHTML={{
          __html: t(sectionHeading),
        }}>

      </div>
        

      

      </Heading>
      {sectionSubHeading && headingPosition === 'center' && (
          <Text variant="small" className="text-gray-500 text-sm pb-0.5 mt-1.5 ">
          {t(sectionSubHeading)}
        </Text>

        
      )}

    


    </div>

    

      
  );
};

export default SectionHeader;
