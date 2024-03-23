import Heading from '@components/ui/heading';
import cn from 'classnames';
import { useTranslation } from 'src/app/i18n/client';
import Text from '@components/ui/text';

interface ItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Props {
  lang: string;
  className?: string;
  item: ItemProps;
}

const FeaturedCard: React.FC<Props> = ({ lang, item, className }) => {
  const { t } = useTranslation(lang, 'common');
  const { icon, title, description } = item;
  return (
    <div
      className={cn(
        'group   flex items-center justify-center  border-black/10 ltr:border-r rtl:border-l',
        className
      )}
    >
        <div className="flex flex-shrink-0 items-center justify-center">
        {icon}
      </div>
      <div className="ps-4">
        <Heading variant="base" className="-mt-0.5">
          {t(title)}
        </Heading>
        <Text>{t(description)}</Text>
      </div>
      
    </div>
  );
};

export default FeaturedCard;
