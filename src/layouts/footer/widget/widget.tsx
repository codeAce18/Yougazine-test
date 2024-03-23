import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import Container from '@components/ui/container';
import WidgetSubscription from './widget-subscription';
import { footer } from '../data';
import cn from 'classnames';

interface WidgetsProps {
  lang: string;
  variant?: 'default' | 'medium';
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({
  lang,
  widgets,
  variant = 'default',
}) => {
  const { social } = footer;
  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px] pt-10 md:pt-16">
        <WidgetAbout
          social={social}
          className="col-span-full sm:col-span-1 md:col-span-3"
          lang={lang}
        />
        {widgets?.slice(0, 3)?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2"
            lang={lang}
          />
        ))}
        <WidgetSubscription
          className={cn(
            'col-span-full sm:col-span-1 md:col-start-4 xl:col-start-auto md:col-span-4 xl:col-span-3'
          )}
          lang={lang}
        />
      </div>
    </Container>
  );
};

export default Widgets;
