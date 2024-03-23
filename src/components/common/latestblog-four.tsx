'use client';
import LatestblogCard from '@components/cards/latestblog-card';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import {SwiperSlide} from '@components/ui/carousel/slider';
import {ROUTES} from '@utils/routes';
import {useBlogsQuery} from "@framework/blog/get-all-blogs";
import useWindowSize from "@utils/use-window-size";

interface Props {
    lang: string;
    className?: string;
    showShortDesc?:boolean;
    headingPosition?: 'left' | 'center';
}

const breakpoints = {
    '1536': {
        slidesPerView: 4,
    },
    '1280': {
        slidesPerView: 4,
    },
    '1024': {
        slidesPerView: 3,
    },
    '768': {
        slidesPerView: 2,
    },
    '540': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};

const LatestblogCarousel: React.FC<Props> = ({
             lang,
             className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5',
             showShortDesc,
             headingPosition = 'left',
    }) => {
    const {width} = useWindowSize();
    const {data, isLoading, error} = useBlogsQuery({});
    let limit = 8;
    if(width!  < 767 ) limit = 3;
    const dataBlog = data?.data.slice(0, limit);


    return (
        <div className={className}>

            <SectionHeader sectionHeading="text-latestblog" sectionSubHeading={'text-best-sellers-subheading'} headingPosition={"center"} className="mb-3"/>
            <Carousel
                lang={lang}
                breakpoints={breakpoints}
                autoplay={false}
                navigation={true}
                className=" "
                prevActivateId="latestblog-carousel-button-prev"
                nextActivateId="latestblog-carousel-button-next"
            >
                {dataBlog?.map((item) => (
                    <SwiperSlide
                        key={`collection-key-${item.id}`}
                        className=""
                    >
                        <LatestblogCard
                            lang={lang}
                            key={item.id}
                            collection={item}
                            showShortDesc={showShortDesc}
                            href={`/${lang}${ROUTES.BLOG}/${item.slug}`}
                        />
                    </SwiperSlide>
                ))}
            </Carousel>

        </div>
    );
};

export default LatestblogCarousel;
