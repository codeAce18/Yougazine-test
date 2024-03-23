import Widgets from '@layouts/footer/widget-footer2';
import Copyright from '@layouts/footer/copyright';
import { footer } from '@layouts/footer/data';
import React from "react";
const { widgets, payment,social } = footer;
interface Props {
    lang: string;
}
function getImage(deviceWidth: number, imgObj: any) {
    return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const Footer: React.FC<Props> = ({ lang }) => {
    
    return (
        <footer className="footer-one border-t border-black/10 bg-skin-two text-gray-400" >
            <Widgets widgets={widgets} social={social} lang={lang} />
            <Copyright payment={payment}  lang={lang} />
        </footer>
    );
};

export default Footer;
