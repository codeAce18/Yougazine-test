import BannerCard from '@components/cards/banner-card';
import useWindowSize from '@utils/use-window-size';
import Container from '@components/ui/container';

interface BannerProps {
    data?: any;
    className?: string;
}


const BannerBackground: React.FC<BannerProps> = ({
                                                     data,
                                                     className = 'mb-3 xl:mb-6 ',
                                                 }) => {
    const backgroundBanner = '/assets/images/bg_block.jpg';
    return (
        <div className={`${className} text-center text-white bg-fixed bg-bottom bg-center sm:py-35 py-40`}
             style={{backgroundImage: `url(${backgroundBanner})`}}>
            <Container>
                <div className={`flex flex-col`}>
                    <h4 className={"text-xl uppercase mb-5"}>Clearance Sales</h4>
                    <h2 className={"text-6xl uppercase mb-5"}>All Sales are Final!</h2>
                    <p className={"mb-20"}>Last chance to take advantage of our discounts!</p>
                    <p className={""}><a className="bg-white text-sm text-skin-base md:h-12 mt-5 py-4 px-16 font-semibold hover:bg-skin-primary hover:text-white  focus:outline-none focus:shadow-outline rounded" title="Discover Sale"
                          href="$">Discover Sale</a>
                    </p>
                </div>
            </Container>
        </div>
    );
};

export default BannerBackground;
