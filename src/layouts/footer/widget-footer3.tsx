import Container from '@components/ui/container';
import WidgetLink from '@layouts/footer/widget-link';
import WidgetAbout from '@layouts/footer/widget/widget-about-us';
import WidgetSubscription from '@layouts/footer/widget-newsletter3';

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
          <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px] ">
              <WidgetAbout
                  lang={lang}
                  social={social}
                  className="col-span-full sm:col-span-1 md:col-span-3 "
              />
            <div className={"grid gap-5 md:grid-cols-6 sm:col-span-1 md:col-span-5"}>
              {widgets.slice(0,3)?.map((widget) => (
                  <WidgetLink
                      lang={lang}
                      key={`footer-widget--key${widget.id}`}
                      data={widget}
                      className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2"
                  />
              ))}
            </div>

              <WidgetSubscription lang={lang} className="newsletterFooter sm:col-span-1 md:col-span-4 lg:border-l lg:border-black/10 lg:pl-10" />

          </div>
        </Container>
      </>

  );
};

export default Widgets;
