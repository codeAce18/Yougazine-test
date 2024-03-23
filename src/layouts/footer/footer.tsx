import Widgets from '@layouts/footer/widget-footer';
import Copyright from '@layouts/footer/copyright';
import { footer } from '@layouts/footer/data';
import React from "react";
const { widgets, payment,social } = footer;
import useWindowSize from "@utils/use-window-size";
interface Props {
    lang: string;
}
function getImage(deviceWidth: number, imgObj: any) {
    return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const Footer: React.FC<Props> = ({ lang }) => {
    const {width} = useWindowSize();
    const imageFooter ={
        mobile: {
            url: '/assets/images/hero/home1/bg_footer_mobile_h8.jpg',
        },
        desktop: {
            url: '/assets/images/hero/home1/bg_footer_h8.jpg',
        },
    }
    const selectedImage = getImage(width!, imageFooter);
    return (
        <footer className="border-t   border-black/10 pt-10 md:pt-16 bg-[#f7f7f7] text-gray-400 bg-fixed">
            <Widgets widgets={widgets} social={social} lang={lang} />
            <Copyright payment={payment}  lang={lang} />
        </footer>
    );
};

export default Footer;
