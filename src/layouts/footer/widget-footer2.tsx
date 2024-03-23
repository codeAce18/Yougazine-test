import Container from '@components/ui/container';
import WidgetLink from '@layouts/footer/widget-link';
import WidgetAbout from '@layouts/footer/widget/widget-about-us';
import WidgetSubscription from '@layouts/footer/widget-newsletter2';

interface WidgetsProps {
    lang: string;
    social?: any;
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({ lang, widgets, social }) => {
  
  return (
      <>
          <Container>
          <div className="grid grid-cols-2 md:grid-cols-9 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[60px] pt-10 md:pt-16">
            
            {widgets?.map((widget) => (
                <WidgetLink
                    lang={lang}
                    key={`footer-widget--key${widget.id}`}
                    data={widget}
                    className="pb-3.5 sm:pb-0 col-span-1 md:col-span-3 xl:col-span-2"
                />
            ))}
              <WidgetAbout
                  lang={lang}
                  social={social}
                  className="col-span-full sm:col-span-1 md:col-span-3 "
              />
          </div>
        </Container>
          <div className="border-t border-white/10 bg-black/[.2] py-5 sm:py-10">
              <Container className={"sm:max-w-[1370px]"}>
                  <WidgetSubscription lang={lang} className="newsletterFooter  items-center" />
              </Container>
          </div>
      </>

  );
};

export default Widgets;
