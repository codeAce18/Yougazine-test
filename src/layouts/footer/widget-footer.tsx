import Container from '@components/ui/container';
import WidgetLink from '@layouts/footer/widget-link';
import WidgetAbout from '@layouts/footer/widget/widget-about-us';
import WidgetSubscription from '@layouts/footer/widget-newsletter';

interface WidgetsProps {
    lang: string;
    social?: any;
    widgets: {
        id: number;
        widgetTitle: string;
        lists: any;
    }[];
}

const Widgets: React.FC<WidgetsProps> = ({lang, widgets, social}) => {
    
    return (
        <>
            <WidgetSubscription lang={lang} className="newsletterFooter items-center px-6 border-b border-white/10 pb-14 lg:pb-20"/>
            <Container>
                <div
                    className="grid grid-cols-2 md:pl-[100px] sm:pl-0 md:grid-cols-9 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[60px] pt-10 md:pt-16">
                    
                    {widgets?.map((widget) => (
                        <WidgetLink
                            lang={lang}
                            key={`footer-widget--key${widget.id}`}
                            data={widget}
                            className="pb-3.5 sm:pb-0 col-span-1 md:col-span-3 xl:col-span-3"
                        />
                    ))}
                    <WidgetAbout
                        lang={lang}
                        social={social}
                        className="col-span-full sm:col-span-1 md:col-span-3 "
                    />
                </div>
            </Container>
        
        </>
    
    );
};

export default Widgets;
