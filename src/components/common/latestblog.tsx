'use client';
import LatestblogCard from '@components/cards/latestblog-card';
import SectionHeader from '@components/common/section-header';
import Container from '@components/ui/container';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { ROUTES } from '@utils/routes';
import { useBlogsQuery } from '@framework/blog/get-all-blogs';

interface Props {
  className?: string;
  lang: string;
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

const Latestblog: React.FC<Props> = ({
  lang,
  className = 'relative mb-8',
  headingPosition = 'left',
}) => {
  const { data, isLoading, error } = useBlogsQuery({});
  const dataBlog = data?.data && [];
  console.log(data?.data);
  const { width } = useWindowSize();

  return (
    <div className={className}>
      <SectionHeader
        lang={lang}
        sectionHeading="text-latestblog"
        className="mb-5 md:mb-5 block-title"
      />
      <Carousel
          lang={lang}
          breakpoints={breakpoints}
          autoplay={false}
          navigation={true}
          className=" "
          prevActivateId="latestblog-carousel-button-prev"
          nextActivateId="latestblog-carousel-button-next"
      >
        {data?.data?.map((item) => (
          <SwiperSlide
            key={`collection-key-${item.id}`}
          >
            <LatestblogCard
              lang={lang}
              key={item._id}
              collection={item}
              href={`/${lang}${ROUTES.BLOG}/${item.slug}`}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default Latestblog;
